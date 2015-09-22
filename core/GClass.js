/**
 * Created by yanchunguang on 15/9/21.
 * 自定义类继承
 */

(function(){
    g.Class = function(){};

    g.Class.extend = function(props)
    {
        var _super = this.prototype;
        var prototype = Object.create(_super);

        function Class() {
            if (this.ctor)
                this.ctor.apply(this, arguments);
        }

        var deepCopy = function(props,prototype)
        {
            var prototype = prototype || {};

            for(var name in props)
            {
                if(typeof props[name] === "object")
                {
                    prototype[name] = (props[name].constructor === Array) ? [] : {};
                    deepCopy(props[name], prototype[name]);
                }
                else
                {
                    prototype[name] = props[name];
                }
            }

            return prototype;
        };
        prototype = deepCopy(props, prototype);

        Class.prototype = prototype;

        Class.extend = g.Class.extend;

        return Class;
    };

})();

