

var Event = function() {

    var clientList = {},
        listen,
        trigger,
        remove;
    
    /**
     * 添加订阅者，在某类订阅中
     */
    listen = function( key, fn ){
        if( !clientList[ key ] ){
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn ) 
    };

    /**
     * 发布消息
     */
    trigger = function(){

        var key = Array.prototype.shift.call( arguments )
        fns = clientList[ key ]
        if( !fns || fns.length === 0 ){
            return false
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments )//发布消息带上的参数，比如今天的房子价格7000
        }
    };


    remove = function( key, fn ){
        var fns = clientList[ key ];
        if( !fns ){
            return false
        }
        if( !fn ){
    
            fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length-1; l >=0; l-- ){
                var _fn = fns[ l ];
                if( _fn === fn ){
                    fns.splice( l, 1);
                }
            }
        }
    };

    return {
        listen:  listen,
        trigger: trigger,
        remove:  remove,
        clientList:clientList
    }

} 

module.exports = Event;
