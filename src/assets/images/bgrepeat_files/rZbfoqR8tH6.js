;/*FB_PKG_DELIM*/

__d("PolarisProfileReelsTabContentQuery_instagramRelayOperation",[],(function(a,b,c,d,e,f){e.exports="7174719122650862"}),null);
__d("PolarisProfileReelsTabContentQuery$Parameters",["PolarisProfileReelsTabContentQuery_instagramRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("PolarisProfileReelsTabContentQuery_instagramRelayOperation"),metadata:{is_distillery:!0},name:"PolarisProfileReelsTabContentQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("PolarisProfileTaggedTabContentQuery_instagramRelayOperation",[],(function(a,b,c,d,e,f){e.exports="7624872930903566"}),null);
__d("PolarisProfileTaggedTabContentQuery$Parameters",["PolarisProfileTaggedTabContentQuery_instagramRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("PolarisProfileTaggedTabContentQuery_instagramRelayOperation"),metadata:{is_distillery:!0},name:"PolarisProfileTaggedTabContentQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("PolarisProfileFeedTabRoot.entrypoint",["JSResourceForInteraction","PolarisProfilePostsDirectQuery$Parameters","PolarisProfilePostsQuery$Parameters","buildPolarisProfileRoute.entrypoint","gkx"],(function(a,b,c,d,e,f,g){"use strict";a=c("buildPolarisProfileRoute.entrypoint")(c("JSResourceForInteraction")("PolarisProfileFeedTabRoot.react").__setRef("PolarisProfileFeedTabRoot.entrypoint"),function(a){a=a.routeParams.username;return{queries:{contentQuery:{options:{},parameters:c("gkx")("1746")?c("PolarisProfilePostsDirectQuery$Parameters"):c("PolarisProfilePostsQuery$Parameters"),variables:{data:{count:12,include_relationship_info:!0,latest_besties_reel_media:!0,latest_reel_media:!0},username:a}}}}});g["default"]=a}),98);
__d("PolarisProfileReelsTabRoot.entrypoint",["JSResourceForInteraction","PolarisProfileReelsTabContentQuery$Parameters","buildPolarisProfileRoute.entrypoint"],(function(a,b,c,d,e,f,g){"use strict";a=c("buildPolarisProfileRoute.entrypoint")(c("JSResourceForInteraction")("PolarisProfileReelsTabRoot.react").__setRef("PolarisProfileReelsTabRoot.entrypoint"),function(a){a=a.routeProps;return{queries:{contentQuery:{options:{},parameters:c("PolarisProfileReelsTabContentQuery$Parameters"),variables:{data:{include_feed_video:!0,page_size:12,target_user_id:a.id}}}}}});g["default"]=a}),98);
__d("PolarisProfileTaggedTabRoot.entrypoint",["JSResourceForInteraction","PolarisProfileTaggedTabContentQuery$Parameters","buildPolarisProfileRoute.entrypoint"],(function(a,b,c,d,e,f,g){"use strict";a=c("buildPolarisProfileRoute.entrypoint")(c("JSResourceForInteraction")("PolarisProfileTaggedTabRoot.react").__setRef("PolarisProfileTaggedTabRoot.entrypoint"),function(a){a=a.routeProps;return{queries:{contentQuery:{options:{},parameters:c("PolarisProfileTaggedTabContentQuery$Parameters"),variables:{count:12,user_id:a.id}}}}});g["default"]=a}),98);