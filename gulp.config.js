module.exports = function(){
    var config = {
        /**
         * File paths
         **/
        // all src files
        allhtml: ['./src/index.html'],
        alljs:   ['./src/**/*.js'],
        alltemplates: ['./src/**/*.handlebars'],
        allsass: ['./src/**/*.scss'],
        allimg: ['./src/**/*.png','./src/**/*.jpg']
    };
    
    return config;
};