/**
 * Created by yanchunguang on 15/9/21.
 */

var g = g || {};

g.log = function(args)
{
    console.log.apply(console, arguments);
};

g.warn = function(args)
{
    console.warn.apply(console, arguments);
};

g.error = function(args)
{
    console.error.apply(console, arguments);
};
