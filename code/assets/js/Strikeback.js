function FacebookShare(source, parameter){
	FS.social.publishToFacebookWall(source, parameter);
	return false;
}
function TwitterShare(source, parameter){
	FS.social.publishToTwitterFeed(source, parameter);
	return false;
}

$('document').ready(function(){

	// These functions are used to send share status messages back to flash (ie. on successful or unsuccessful share attempts)
    /*FacebookShare.call = function (source, success) {
    	if ( swfobject.getObjectById("swf") )
		swfobject.getObjectById("swf").onFacebookShare(source, success);
	};

    TwitterShare.call = function (source, success) {
    	if ( swfobject.getObjectById("swf") )
		swfobject.getObjectById("swf").onTwitterShare(source, success);
	};*/

	
	/*resize();
	$(window).resize(function(){
		resize();
		resize();
	});
	
	function resize()
	{
		$('#bodycontainer > div').css({
			height: $(window).height()
		});
		$('#bodycontainer').css({
			height: $(window).height()
		});
	}*/
});


/*  Define object */
if( typeof FS === "undefined"  ) var FS = {};

/*  Analytics functions */
FS.analytics = {
	
	trackPageview: function(v){
		var gaTag = FS.analytics.getGATag();
		//Fuel Tracking
	    //var pageTracker = _gat._createTracker( 'UA-394615-61' );
		var pageTracker = _gat._createTracker( gaTag );
	    pageTracker._trackPageview(v);
	},
	trackEvent: function(cat, action, label, value){
		var gaTag = FS.analytics.getGATag();
		//Fuel Tracking
	    //var pageTracker = _gat._createTracker( 'UA-394615-61' );
		var pageTracker = _gat._createTracker( gaTag );
	    pageTracker._trackEvent(cat, action, label, value);
	},
	getGATag: function(){
		if (window.location.href.indexOf('www.strike-back-games.com') > 0){
			return CONSTANTS.GA_Tag.live;
		}
		else {
			return CONSTANTS.GA_Tag.stage;
		}
	}
};

FS.layout = {
		resizeSWFToMax: function(){
			$('#bodycontainer').css({
				height: '900px'
			});
			$('#bodycontainer > div').css({
				height: '900px'
			});
		}
}

var FBNumClicks = 1;
var TwitterNumClicks = 1;

/* create social functions */
FS.social = {
    shareflag: {
        facebook: {
            ingame: false,
            video: false
        },
        twitter: {
            ingame: false,
            video: false
        }
    },
	getShareLink : function(){
		if (window.location.href.indexOf('www.strike-back-games.com') > 0){
			return CONSTANTS.ShareURL.live;
		}
		else if (window.location.href.indexOf('staging.strike-back-games.com') > 0){
			return CONSTANTS.ShareURL.stage;
		}
		else {
			return CONSTANTS.ShareURL.dev;
		}
	},
    publishToFacebookWall: function (source, parameter) {


        var n = CONSTANTS.Facebook.name;
        var c = CONSTANTS.Facebook.caption;
        var d;
        var p = "";
        var link = FS.social.getShareLink();
        var screenshot = link.substring(0,link.indexOf('/',10)) + '/assets/images/logo/strikeback_logo.png';

        /*//Verify that user has not already shared with that source (can only do so once per 'session')
        if (source == 'video' && FS.social.shareflag.facebook.video) {
            alert("You may only post to facebook once per session.");
            //FacebookShare.call(source, false);
            return false;
        }
        else if (source != 'video' && FS.social.shareflag.facebook.ingame) {
            alert("You may only post to facebook once per session.");
            //FacebookShare.call(source, false);
            return false;
        }*/
        //if reached here, user can post
        if (source == 'video') {
            d = CONSTANTS.Facebook.description.video;
        }
        else {
            d = CONSTANTS.Facebook.description.video;
        }

        /*if (parameter) {
            p = "flashData=" + parameter;
            link = link + '?' + p;
        }*/
        
        var addthisURL = 'http://api.addthis.com/oexchange/0.8/forward/facebook/offer?url='+encodeURIComponent(link)+'&title='+encodeURIComponent(n)+'&description='+encodeURIComponent(d)+'&caption='+c+'&screenshot='+encodeURIComponent(screenshot)+'&pubid=ra-4e2dc163513b3334&ct=1';
        
        window.open(addthisURL,'Post Strikeback to Facebook!','toolbars=0,location=0,height=500,width=600,menubar=0',false);
        
        /*FB.ui(
		    {
		        app_id: CONSTANTS.Facebook.apikey,
		        method: 'feed',
		        link: link,
		        name: n,
		        picture: "",
		        caption: c,
		        description: d
		    },
		    function (response) {
		        if (response && response.post_id) {
		            //successful share attempt
		            if (source == 'video') {
		                FS.social.shareflag.facebook.video = true;
		            }
		            else {
		                FS.social.shareflag.facebook.ingame = true;
		            }
		            //FacebookShare.call(source, true);
		        }
		        else {
		        }
		    }
	    );*/
    },

    publishToTwitterFeed: function (source, parameter) {


        //Verify that user has not already shared with that source (can only do so once per 'session')
        /*if (source == 'video' && FS.social.shareflag.twitter.video) {
            alert("You may only post to twitter once per session.");
            //FacebookShare.call(source, false);
            return false;
        }
        else if (source != 'video' && FS.social.shareflag.twitter.ingame) {
            alert("You may only post to twitter once per session.");
            //FacebookShare.call(source, false);
            return false;
        }*/
        //if reached here, user can post
        var p = "";
        var t = "";
        var link = FS.social.getShareLink();
        var shortLink = '';
        /*if (parameter != null) {
            p = "?flashData=" + parameter;
            link = link + p;
        }*/
        //Add time to end of URL before shortening (should protect against duplicate tweets, hopefully
        //link = link + "&t=" + Date.now();
        /*if (text != null){
        t = text;
        }*/
        if (source == 'video') {
            t = CONSTANTS.Twitter.text.video;
        }
        else {
            t = CONSTANTS.Twitter.text.ingame;
        }
        
        var addthisURL = 'http://api.addthis.com/oexchange/0.8/forward/twitter/offer?url='+encodeURIComponent(link)+'&description='+encodeURIComponent(t)+'&template={{description}}%20{{url}}&pubid=ra-4e2dc163513b3334&ct=1';
        
        window.open(addthisURL,'Post Strikeback to Twitter!','toolbars=0,location=0,height=600,width=700,menubar=0',false);
        

        /*$.shortenUrl(link, function (short_url) {
            shortLink = short_url;
            $("#tbox_container").dialog({
                resizable: false,
                modal: true,
                show: "slide",
                hide: "slide",
                width: 545,
                autoOpen: true,
                close: function (successful) {
                    $("#tbox").text("");
                    if (!FS.social.shareflag.twitter.video) {
                        TwitterNumClicks = TwitterNumClicks - 1;
                    } else if (!FS.social.shareflag.twitter.ingame) {
                        TwitterNumClicks = TwitterNumClicks - 1;
                    }
                    //if not a successful tweet, callback function to flash will not have been called, so call it
                    if (!successful) {
                        //TwitterShare.call(source, false);
                    }
                }
            });

            
            twttr.anywhere(function (T) {
                T("#tbox").tweetBox({
                    counter: true,
                    label: 'Tweet and invite people',
                    defaultContent: t + ' ' + shortLink + ' ' + CONSTANTS.Twitter.hashtag,
                    onTweet: function (ptweet, htweet) {
                        $("#tbox").text("");
                        $("#tbox_container").dialog("close", true);
                        if (source == 'video') {
                            FS.social.shareflag.twitter.video = true;
                        }
                        else {
                            FS.social.shareflag.twitter.ingame = true;
                        }
                        //TwitterShare.call(source, true);
                    }
                });
            });*/
            /*$('#tweeting-button').mouseup(function(){
            console.log('#tweeting-button');
            //Set a timer to verify that tweet occurred.  If dialog is still opened, error occurred in the tweet
            setTimeout(function(){
            if ($("#tbox_container").dialog("isOpen")){
            $(document).stop(true, true);
            $("#tbox").text("");
            $("#tbox_container").dialog("close", false);
            }
            },10000);
            });*/
        //});
    }
};