/**
 *  Setup Pagr
 */
var pagr = (function() {
    function init( config )
    {
        // Init pages
        initPages();
        
        // Init config
        if( typeof config === "undefined" )
            config = { };
            
        // Set default config values
        initConfig( config );
        
        // Init links
        $( '.' + config.linkName ).click( function( event ) {
            event.preventDefault();
            goToPage( $( event.target ).attr( 'href' ), config );
        } );
        
        window.onpopstate = function( event ) {
            if( event.state )
                scrollToPage( event.state.page, config );
        };
    }
    
    function initPages()
    {
        function setupPageContainer( element, sizeFunc )
        {
            // Get child pages
            var pages = $( element ).children( '.page' );
            
            // Generate container for pages, get it
            var container = $( element ).append( '<div class="pagecontainer-autogen" />' ).children( '.pagecontainer-autogen' );
            
            // Add child pages, set container width
            container.append( pages );
            container[ sizeFunc ]( ( 100 * pages.length ) + '%' );
            
            // set page widths appropriately
            pages.each( function( index, element ) {
                $( element )[ sizeFunc ]( ( 100 / pages.length ) + '%' );
            } );
        }
        
        $( '.pagecontainer-horiz' ).each( function( index, element ) {
            setupPageContainer( element, "width" );
        } );
        
        $( '.pagecontainer-vert' ).each( function( index, element ) {
            setupPageContainer( element, "height" );
        } );
    }
    
    /**
     *  Initializes config with default settings
     */
    function initConfig( config )
    {
        // Save time, scroll instantly, reload time
        var time = config.scrollTime || 400;
        
        if( config.initialPage !== undefined )
        {
            config.scrollTime = 0;
            goToPage( config.initialPage, config );
        }
        
        config.scrollTime = time;
            
        if( config.scrollEase === undefined )
            config.scrollEase = "easeOutQuad";
            
        if( config.linkName === undefined )
            config.linkName = "pagrlink";
    }
    
    /**
     *  Scroll to the specified page
     */
    function goToPage( pageName, config )
    {
        // If no pages, just go to home
        if( pageName.length === 0 )
            return;
        
        // Add current state to history
        window.history.pushState( { page: pageName }, document.title, pageName );
        
        // Scroll to the proper page
        scrollToPage( pageName, config );
    }
    
    /**
     *  Actually start the scroll to the page
     */
    function scrollToPage( pageNames, config )
    {
        /**
         *  Get the index of a jQuery object
         */
        function getPageIndex( page )
        {
            var count = 0;
            for( var elem = page[ 0 ]; ( elem = elem.previousSibling ) !== null; )
                if( $( elem ).hasClass( 'page' ) )
                    ++count;
            return count;
        }
        
        // Convert pageNames to array
        if( typeof pageNames === "string" )
            pageNames = pageNames.split( '/' ).filter( function( obj ) { return obj.length > 0; } );
        
        // Get page being scrolled to
        var scrollPage = $( '.pagecontainer-autogen > .page#' + pageNames[ 0 ] ),
            options = { };
        
        // Set which direction to scroll in, and how far to go
        if( scrollPage.parent().parent().hasClass( 'pagecontainer-horiz' ) )
        {
            options.left = -( getPageIndex( scrollPage ) * scrollPage.width() );
        }
        else if( scrollPage.parent().parent().hasClass( 'pagecontainer-vert' ) )
        {
            options.top = -( getPageIndex( scrollPage ) * scrollPage.height() );
        }
        
        // Scroll to page
        $( scrollPage.parent() ).animate(
            // Scroll container so that current view is selected
            options,
            // Scroll over 400ms
            config.scrollTime,
            // Easing
            config.scrollEase,
            // If page has special scroll, use that.
            function() {
                scrollToPage( pageNames.splice( 1, 1 ), config );
            }
        );
    }
    
    return init;
} )();
