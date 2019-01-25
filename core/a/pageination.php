<?php
namespace Nibiru\Module;
/**
 * Created by PhpStorm.
 * User: Stephan Kasdorf
 * Date: 15.09.18
 * Last Update: 04.01.2019
 * Time: 19:13
 */
use Nibiru\Attributes;
use Nibiru\Config;
use Nibiru\Controller;
use Nibiru\Router;
use Nibiru\View;

abstract class Pageination implements \Nibiru\IPageination
{
    use Attributes\Pageination;

    private static $_table                = false;
    private static $_current_page_content = array();
    private static $_current_number         = 0;
    private static $_next_page_number       = +1;
    private static $_previous_page_number   = -1;
    private static $_max_pages              = 0;
    private static $_entries_per_page       = 5;
    private static $_page_entry_index       = array();
    private static $_max_page_entries       = 0;
    private static $_uri_pagination_path    = '';

    private static function setUriPaginationPath()
    {
        self::$_uri_pagination_path = '/' . Router::getInstance()->currentPage() . '/' . Controller::getInstance()->getRequest()['_action'] . '/';
    }

    private static function getUriPaginationPath()
    {
        return self::$_uri_pagination_path;
    }

    private static function loadPaginationToTemplate()
    {
        $pagination = array(
            'current'        => self::getCurrentNumber(),
            'next'           => self::getNextPageNumber(),
            'previous'       => self::getPreviousPageNumber(),
            'paginationPath' => self::getUriPaginationPath()
        );
        for($i=0;$i<self::getMaxPages();$i++)
        {
            $pagination[]['page'] = $i+1;
        }
        Controller::getInstance()->varname(View::getInstance()->getEngine(), array('pagination' => $pagination));
    }

    /**
     * @return int
     */
    private static function getMaxPageEntries()
    {
        return self::$_max_page_entries;
    }

    /**
     * @param int $max_page_entries
     */
    private static function setMaxPageEntries( $max_page_entries )
    {
        self::$_max_page_entries = $max_page_entries;
    }

    private static function currentPageEntryLimit( )
    {
        return self::getPageEntryIndex()[self::getCurrentNumber()];
    }

    /**
     * @return array
     */
    private static function getPageEntryIndex( )
    {
        return self::$_page_entry_index;
    }

    /**
     * @param array $page_entry_index
     */
    private static function setPageEntryIndex( )
    {
        $PagesWithFullEntriesIndex = floor(self::getMaxPageEntries()/self::getEntriesPerPage());
        for($i=1; $i<$PagesWithFullEntriesIndex+1; $i++)
        {
            $limit = array();

            if($i==1)
            {
                $limit = array(
                    'start'   => 0,
                    'end' => self::getEntriesPerPage()
                );
            }
            else
            {
                $laststart = self::getPageEntryIndex()[$i-1]['start'];

                $limit = array(
                    'start' => $laststart + self::getEntriesPerPage(),
                    'end'   => self::getEntriesPerPage(),
                );

            }
            self::$_page_entry_index[$i] = $limit;
        }
        $fullEntriesOnPages = $PagesWithFullEntriesIndex*self::getEntriesPerPage();
        if($fullEntriesOnPages<self::getMaxPageEntries())
        {
            $lastPageEntries = self::getMaxPageEntries()-($PagesWithFullEntriesIndex*self::getEntriesPerPage());
            $limit = array(
                'start' => self::getPageEntryIndex()[$i-1]['start']+self::getEntriesPerPage(),
                'end'   => $lastPageEntries
            );
            self::$_page_entry_index[$i] = $limit;
        }
        self::setUriPaginationPath();
        self::loadPaginationToTemplate();
    }

    /**
     * @return int
     */
    private static function getEntriesPerPage()
    {
        return self::$_entries_per_page;
    }

    /**
     * @param int $entries_per_page
     */
    private static function setEntriesPerPage( )
    {
        self::$_entries_per_page = Config::getInstance()->getConfig()[View::NIBIRU_SETTINGS]['entriesperpage'];
    }

    /**
     * @return int
     */
    public static function getMaxPages( )
    {
        return self::$_max_pages;
    }

    /**
     * @desc if you have deactivated pages you can set a filter here
     * @param string $where
     */
    private static function setMaxPages( $where = '' )
    {
        $tableinfo = self::getTable()->loadAllTableFieldNames();
        self::setMaxPageEntries( self::getTable()->loadTableRowCount( $tableinfo[0], $where ));
        self::$_max_pages = ceil(self::getMaxPageEntries()/self::getEntriesPerPage());
    }

    /**
     * @return boolean
     */
    private static function getTable( )
    {
        return self::$_table;
    }

    /**
     * @param boolean $table
     */
    public static function setTable( Adapter\IDb $table, $where = '' )
    {
        if(is_object( $table ))
        {
            self::setEntriesPerPage();
            self::$_table = $table;
            self::setMaxPages( $where );
            self::setPageEntryIndex();
        }
    }

    /**
     * @return array
     */
    protected static function pageContent()
    {
        return self::$_current_page_content;
    }

    /**
     * @param array $current_page_content
     */
    protected static function setCurrentPageContent( )
    {
        self::$_current_page_content = array();

        $sortOrderIndex = 0;
        for($i=0; sizeof( self::getTable()->loadAllTableFieldNames() ) > $i; $i++)
        {
            if( self::getTable()->loadAllTableFieldNames()[$i] == 'time' )
            {
                $sortOrderIndex = $i;
            }
        }
        self::$_current_page_content = self::getTable()->loadTableAsArray( self::currentPageEntryLimit(), ' ORDER BY ' . self::getTable()->loadAllTableFieldNames()[$sortOrderIndex] . ' DESC ' );
    }

    /**
     * @return int
     */
    protected static function getCurrentNumber()
    {
        return self::$_current_number;
    }

    /**
     * @desc the skip param is for using the pagination on a class that
     *       is also used without the pagination, so in order to avoid the
     *       settings not to work, it is possible to skip the currentNumber
     *       setup.
     * @param int $current_number
     */
    protected static function setCurrentNumber( )
    {
        try {
            $page = false;
            $uri = explode('/', $_SERVER['REQUEST_URI']);
            foreach ($uri as $uripart)
            {
                if($page)
                {
                    if(is_numeric($uripart))
                    {
                        self::$_current_number = $uripart;
                        Controller::getInstance()->varname(View::getInstance()->getEngine(), array('pagenumber' => self::getCurrentNumber()));
                        $page = false;
                        self::setNextPageNumber();
                        self::setPreviousPageNumber();
                    }
                    else
                    {
                        throw new \Exception('ERROR: the pagenumber has to be a nummeric value!');
                    }
                }
                if($uripart == 'page')
                {
                    $page = true;
                }
            }
            if(self::getCurrentNumber() == self::CURRENT_PAGE)
            {
                throw new \Exception('ERROR: URL parameter [page] is missing, please check your class and add the parameter!');
            }
            self::setNextPageNumber();
            self::setPreviousPageNumber();

        }
        catch (\Exception $e)
        {
            echo '<pre>';
            print_r( $e->getMessage() );
            echo '</pre>';
            die();
        }
    }

    /**
     * @return int
     */
    protected static function getNextPageNumber()
    {
        return self::$_next_page_number;
    }

    /**
     * @param int $next_page_number
     */
    protected static function setNextPageNumber(  )
    {
        $next_number = self::getCurrentNumber() + self::PAGE_ITERATION;

        if($next_number>self::getMaxPages())
        {
            self::$_next_page_number = self::getCurrentNumber();
        }
        else
        {
            self::$_next_page_number = self::getCurrentNumber() + self::PAGE_ITERATION;
        }
    }

    /**
     * @return int
     */
    public static function getPreviousPageNumber()
    {
        return self::$_previous_page_number;
    }

    /**
     * @param int $previous_page_number
     */
    public static function setPreviousPageNumber( )
    {
        $prev_number = self::getCurrentNumber() - self::PAGE_ITERATION;

        if($prev_number<self::PAGE_ITERATION)
        {
            self::$_previous_page_number = self::PAGE_ITERATION;
        }
        else
        {
            self::$_previous_page_number = $prev_number;
        }
    }
}