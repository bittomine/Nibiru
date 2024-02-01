class App
{
    constructor()
    {
        this._isWithTooltips = false;
        this.init();
    }

    init()
    {
        this._tableSorters();
        this._tooltips();
        this._navDoc();

        $(window).on('resize', () => this._tooltips());
        $(document).on('shown.bs.tab', () =>
        {
            $(document).trigger('redraw.bs.charts');
        });

        if ($('*').is('.docs-top')) {
            this._backToTopButton();
            $(window).on('scroll', () => this._backToTopButton());
        }
    }

    _navDoc()
    {
        const $toc = $('#markdown-toc');

        if ($('*').is($toc)) {
            this._maybeActivateDocNavigation();
            $(window).on('resize', () => this._maybeActivateDocNavigation());
        }
    }

    _maybeActivateDocNavigation()
    {
        const widthCheck = $(window).width() > 768;
        return widthCheck ? this._activateDocNavigation() : this._deactivateDocNavigation();
    }

    _deactivateDocNavigation()
    {
        const $window = $(window)
        const $toc    = $('#markdown-toc');

        $window.off('resize.theme.nav')
            .off('scroll.theme.nav');

        $toc.css({
            position: '',
            left    : '',
            top     : '',
        });
    }

    _activateDocNavigation()
    {
        const $docsContent = $('.docs-content');
        this.cache         = {
            topPosition  : $docsContent.offset().top - 40,
            rightPosition: $docsContent.offset().left + $docsContent.width() + 45,
        };

        this._updateTocPosition();

        $(window)
            .on('resize.theme.nav', () => this._updateTocPosition())
            .on('scroll.theme.nav', () => this._updateTocPosition());

        $('body').scrollspy({
            target  : '#markdown-toc',
            selector: 'li > a',
        });

        setTimeout(() =>
        {
            $('body').scrollspy('refresh');
        }, 1000);
    }

    _updateTocPosition()
    {
        const $toc      = $('#markdown-toc');
        const scrollTop = $(window).scrollTop();
        const distance  = Math.max(scrollTop - this.cache.topPosition, 0);

        if (!distance) {
            $($toc.find('li')[1]).addClass('active');
            return $toc.css({
                position: '',
                left    : '',
                top     : '',
            });
        }

        $toc.css({
            position: 'fixed',
            left    : this.cache.rightPosition,
            top     : 40,
        });
    }

    _backToTopButton()
    {
        if ($(window).scrollTop() > $(window).height()) {
            $('.docs-top').fadeIn();
        } else {
            $('.docs-top').fadeOut();
        }
    }

    _tooltips()
    {
        const widthCheck = $(window).width() > 768;

        if ((this._isWithTooltips && widthCheck) || (!this._isWithTooltips && !widthCheck)) {
            return;
        }

        this._isWithTooltips = widthCheck;
        $('[data-toggle="tooltip"]').tooltip(this._isWithTooltips ? {} : 'dispose');
    }

    _tableSorters()
    {
        $('[data-sort="table"]').tablesorter({ sortList: [[1, 0]] });
    }
}

window.Nibiru = new App();
