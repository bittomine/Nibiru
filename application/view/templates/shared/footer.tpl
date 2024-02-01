{foreach item=script from=$js}
    {if strpos($script, '?type=es5') !== false}
        <script nomodule src="{$script|replace:'?type=es5':''}"></script>
    {elseif strpos($script, '?type=es6') !== false}
        <script type="module" src="{$script|replace:'?type=es6':''}"></script>
    {else}
        <script src="{$script}"></script>
    {/if}
{/foreach}

{include file="./debugbar.tpl"}
