let requirejsConfig={
    baseUrl: '/dist/js',
    paths: {
        app: '../app'
    }
};

let pages=["chat","login"];
pages.forEach(function(v,i){
    requirejsConfig.paths[v]=v+"/"+v;
})
define("entry",["common"],function(common){   
    let page=common.args.segments[0];
    if(pages.indexOf(page)=== -1){
        window.location.href=location.origin+"/chat";
    }else{
        
        requirejs([page]);
    }
})  
requirejs.config(requirejsConfig);
//requirejs(['Root/Root']);
requirejs(['entry']);