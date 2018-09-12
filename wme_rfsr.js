/* Remote Faucet Surfer Reward v 1.3  */ 
// https://wmexp.com 

	class _RemoteFaucetSurferReward{
		constructor (){//called every time when page is loaded
			//configuration - behavior  settings 
			this.faucet_id = 123456; //this faucet is going to be shown 			
			this.pages_to_visit = 5; //surfer must visit pages to get rewarded
			this.seconds_on_page = 10; //surfer must stay seconds on page to count page as visited
			this.allow_reloads = false; //if true; reloads count as page views 
			this.allow_repeats = true; //if true; visits to the same page count
//settings for the box
			this.box_size = '40px'; //this.box_size x this.box_size 24px;36px;40px; etc.
			this.horizontal_side = 'right'; //may be 'left';'right'
			this.horizontal_offset = '40px'; //
			this.vertical_side = 'top'; //may be 'top'; 'bottom'
			this.vertical_offset = '100px';//
//faucet box styles (if you want to change it from page to page, no .css)
			this.faucet_extra_styles = '';//
//function called before switchins the mark off for some time
			this.before_off_function = null;
//text settings, use for localisation			
			this.txt_bonus = 'bonus';
			this.txt_click_bonus = 'Get your bonus!';
			this.txt_more_pages = 'Visit %n more pages for the bonus';
			this.txt_close = 'close';
			this.txt_info = 'info';
			this.txt_loading = 'loading';
			this.txt_shown = 'faucet shown in other window';
			this.txt_discard_confirm = "Bonus will be discarded!\n\nAre you sure?";
			this.txt_thanks_visits = "<b>Thanks for visiting %n pages!</b>";
			this.txt_more_seconds = "%n more seconds to count the page";
			this.txt_already_visited = "Already visited!";

			this.txt_info_more = '<a title="more..." href="https://wmexp.com/remotely-hosted-bitcoin-faucet-examples-list/example-surfer-reward/" target=_new ">more info</a>';				
			this.txt_off_now = "Close for now";
			this.txt_off_day = "Off for day";
			this.txt_off_week = "Off for week";
			this.txt_off_month = "Off for month";
		}//constructor

		updateMark(txt,ttl)//shows text on mark
		{
			document.getElementById('wme_sr_inner').innerHTML = txt;
			document.getElementById('wme_sr_mark').title = ttl;
		}//updateMark	
		
		timeToRun ()//are we ok to run now?
		{
			var sdate = localStorage.getItem('wme_sr_closed_until');
			if(sdate === null)//not set
			{
				return true;
			}
			var rundate = new Date(sdate);
			var curdate = new Date();
			return( (rundate - curdate) < 0);
		}//timeToRun	

		
		static off(ndays){//closes system for N days
			if ( (typeof(RemoteFaucetSurferReward.faucet_before_off_function) !== null) 
				&& (typeof(window[RemoteFaucetSurferReward.faucet_before_off_function]) == "function")
			   )
			{
				var off_is_allowed = window[RemoteFaucetSurferReward.faucet_before_off_function]();
				if(!off_is_allowed)
				{
					return; //do nothing on false
				}
			}
			var dat = new Date();
			dat.setDate(dat.getDate() + ndays);
			localStorage.setItem("wme_sr_closed_until",dat);
			console.log('Surfer rewarder off until ' + dat);
			document.getElementById('wme_sr_mark').style.display='none';
		}
		
		makeMenu(append_to)//creates close menu
		{			
			var div_mark_close_menu = document.createElement('div');
			var st = '';
			st += '<div id="wme_info_title"></div>';
			st += this.txt_info_more+'<hr>';		
			st += '<a title="'+this.txt_off_now+'" href="javascript:void(0)" onclick="_RemoteFaucetSurferReward.off(0);return false;">'+this.txt_off_now+'</a>';
			st += '<br><a title="'+this.txt_off_day+'" href="javascript:void(0)" onclick="_RemoteFaucetSurferReward.off(1);return false;">'+this.txt_off_day+'</a>';
			st += '<br><a title="'+this.txt_off_week+'" href="javascript:void(0)" onclick="_RemoteFaucetSurferReward.off(7);return false;">'+this.txt_off_week+'</a>';
			st += '<br><a title="'+this.txt_off_month+'" href="javascript:void(0)" onclick="_RemoteFaucetSurferReward.off(30);return false;">'+this.txt_off_month+'</a>';	
			st += '';
			div_mark_close_menu.innerHTML = st;
			div_mark_close_menu.id = 'wme_sr_mark_menu';						
			div_mark_close_menu.style.display = 'none';				
			append_to.appendChild(div_mark_close_menu);
		}//makeMenu

		positionMenu(){
			var o = document.getElementById('wme_sr_mark_menu');
			if(o == null)
			{
				return;
			}
			var height = 100;		
			var width = 100;
			if(o.style.display != 'none'){
				height = Number(o.offsetHeight);		
				width = Number(o.offsetWidth);
			}		
//console.log('positionMenu width:'+width+' height:'+height);
			if(this.vertical_side == 'top'){//
				o.style.bottom = (- height - 0) + 'px';
				o.style.top = null;
			}else{ //bottom
				o.style.top =  (- height - 0) + 'px';
				o.style.bottom = null;
			}
			if(this.horizontal_side == 'left'){
				o.style.right = (- width) +'px';
				o.style.left = null;
			}else{//right
				o.style.left = (- width ) +'px'; 
				o.style.right = null;
			}		
		}//positionMenu
		
		prepareMenu() //position, title, etc
		{

			var self = this;
			if( typeof this.prepareMenu.wme_menu_update_interval == 'undefined' ){
				this.prepareMenu.wme_menu_update_interval = setInterval(function(){
					var wme_sr_mark_p = document.getElementById('wme_sr_mark');
					var ptitle = wme_sr_mark_p.getAttribute("title");
					var etitle = document.getElementById('wme_info_title');
					if(etitle !== null)
					{
						etitle.innerHTML = ptitle; 
						self.positionMenu();
					}
				},200);
			}			
			
		}//prepareMenu
		
		flipMenu(){//displays/hides close menu. 
			var wme_sr_mark_cmid = document.getElementById('wme_sr_mark_menu');
			var wme_sr_mark_mid = document.getElementById('wme_sr_mark_close_text');
			if(wme_sr_mark_cmid.style.display == 'none'){
				wme_sr_mark_cmid.style.display = 'block';
				this.positionMenu();				
				wme_sr_mark_mid.innerHTML = '-';
				this.prepareMenu();
			}else{
				wme_sr_mark_cmid.style.display = 'none';
				wme_sr_mark_mid.innerHTML = '?';
			}
		}//flipMenu
		
		positionMark(){ ///setting fixed position accordingly to configuration
			var div_mark = document.getElementById('wme_sr_mark');
			if(div_mark === null) //nothing to position
			{
				return;
			}
			var div_mark_menu = document.getElementById('wme_sr_mark_menu');
			if(this.horizontal_side == 'left'){
				div_mark.style.left = this.horizontal_offset;
				div_mark.style.right = null;
			}else{ //we presume it's 'right'
				div_mark.style.right = this.horizontal_offset;
				div_mark.style.left = null;
			}
			if(this.vertical_side == 'top'){
				div_mark.style.top = this.vertical_offset;
				div_mark.style.bottom = null;
			}else{ //we presume it's 'bottom'
				div_mark.style.bottom = this.vertical_offset;
				div_mark.style.top = null;
			}	
			/*setting sizes accordingly to configuration*/
			div_mark.style.width = this.box_size;
			div_mark.style.height = this.box_size;	;		
		}//positionMark
		
		createMark(){//creates element
			if(!this.timeToRun()){
				return;
			}
			if(document.getElementById('wme_sr_mark') !== null){//there is only one
				return;
			}
			var div_mark = document.createElement('div');
			document.body.appendChild(div_mark);
			div_mark.id = 'wme_sr_mark';
			div_mark.classList.add('wme_sr_mark_c');
			div_mark.innerHTML = '<div id="wme_sr_inner"><small>'+this.txt_loading+'</small></div>';
			
			var div_mark_close = document.createElement('div'); 
			div_mark_close.id = 'wme_sr_mark_close';
			div_mark.appendChild(div_mark_close);
			div_mark_close.innerHTML = '<div id="wme_sr_mark_close_text">?</div>';
			this.makeMenu(div_mark_close);
			this.positionMark();
			div_mark_close.title = this.txt_info;
			var self = this;
			div_mark_close.addEventListener("click", function(event){   
				var faucet_on = (document.getElementById('wmexp-faucet-'+self.faucet_id) != null)
				if( (faucet_on) ){
					document.getElementById('wme_sr_mark').style.display='none';
				}else{
					self.flipMenu(); //Called from listener, no 'this' here
				}
			});//in click
		}//createMark		 
		
		showFaucet(){//shows faucet in the mark
			var visited_urls = localStorage.getItem("wme_sr_visited");
			if(visited_urls == ''){//faucet shown in other window
				this.updateMark('',this.txt_shown);
				return;
			}
			if(document.getElementById('wmexp-faucet-'+this.faucet_id) !== null )
			{
				alert("ERROR: Can not use Faucet ID " + this.faucet_id + " as the bonus - such a Faucet already exists in this page");
				return;
			}
			var wme_sr_mark_mid = document.getElementById('wme_sr_mark_close'); 
			wme_sr_mark_mid.innerHTML = 'x';
			wme_sr_mark_mid.title = this.txt_close;
			var f_div = "<div id='wmexp-faucet-"+this.faucet_id+"' style='"+this.faucet_extra_styles+"'>"+this.txt_loading+"</div>";
			localStorage.setItem("wme_sr_visited",'');
			var thanks = this.txt_thanks_visits.replace('%n',this.pages_to_visit);
			document.getElementById('wme_sr_inner').innerHTML = thanks + f_div;
			var m = document.getElementById('wme_sr_mark');
			if(this.vertical_side == 'top'){
				m.style.top = 0;
			}else{
				m.style.bottom = 0;
			}			
			m.classList.remove('wme_sr_mark_c');
			m.classList.add('wme_sr_mark_b');
			var script = document.createElement('script');
			script.src = 'https://wmexp.com/faucet/'+this.faucet_id+'/';
			document.head.appendChild(script); //or something of the likes			
		}//showFaucet		
		
		
		showBonus(){ //show 'bonus' over the mark
			this.updateMark('<a href="#" onclick="return false;"><i><b>'+this.txt_bonus+'</b></i></a>',this.txt_click_bonus);
			var m = document.getElementById('wme_sr_mark');
			m.className += ' wme_sr_highlight';
			var self = this;
			var faucet_on_screen = false;
			m.addEventListener("click", function(){
				if(faucet_on_screen == false){
					self.showFaucet();
					faucet_on_screen = true;
				}
			});
		}//showBonus	
		
		removeMark()
		{
			if( typeof this.initMark.ran == 'undefined' ){
			}
			else
			{
				delete this.initMark.ran;
				var element = document.getElementById("wme_sr_mark");
				element.innerHTML = '';
				element.parentNode.removeChild(element);
			}
		}//removeMark
		
		initMark()
		{
			if(!this.timeToRun()){
				return;
			}
			if( typeof this.initMark.ran == 'undefined' ){
				this.initMark.ran = true; //we do init only once
			}else{
				return;
			}
			this.createMark();
			var cur_url = window.location.href;
			var visited_urls_count = 0;
			var visited_urls = localStorage.getItem("wme_sr_visited");
			if( visited_urls == null)
				visited_urls  =  '';
			var a_visited_urls = [];
			if((visited_urls != null) && (visited_urls.length > 0)) {
				a_visited_urls = visited_urls.split(',');
				visited_urls_count = a_visited_urls.length;
			}			
			if(visited_urls_count >= this.pages_to_visit)	{
				this.showBonus();
			}else{
				if(this.allow_reloads){
					this.allow_repeats = true;
				}
				if(
					( (!this.allow_reloads) && (a_visited_urls[a_visited_urls.length-1] == cur_url) )
					||
					( 	(!this.allow_repeats) && 
							( (visited_urls.indexOf(cur_url+',') != -1) || (visited_urls.indexOf(','+cur_url) != -1) ) 
						)
					){
						var txt_done = '' + this.pages_to_visit + "/" + (visited_urls_count) + '';
						this.updateMark(txt_done,this.txt_already_visited); 
						return;
				}

				var seconds_left =  this.seconds_on_page;
				var self = this; //setInterval ahead
				var tick = setInterval(function(){
					if(seconds_left > 1){
						seconds_left--;
						var txt_tick = seconds_left; 
						var ttl_s = self.txt_more_seconds.replace('%n',seconds_left);
						self.updateMark(txt_tick,ttl_s);  
					}else{
						clearInterval(tick);
						visited_urls_count++;
						a_visited_urls.push(cur_url);
						visited_urls = a_visited_urls.join(',');
						localStorage.setItem("wme_sr_visited",visited_urls);
						var txt_done = '' + self.pages_to_visit + "/" + (visited_urls_count) + '';
						var ttl_p = self.txt_more_pages.replace('%n',self.pages_to_visit - visited_urls_count);
						self.updateMark(txt_done,ttl_p); 					
						if(self.pages_to_visit <= visited_urls_count){
							self.showBonus();
						}             
					}
				},1000);
			}
		}//pageLoaded
	}//RemoteFaucetSurferReward
//})();

var RemoteFaucetSurferReward = new _RemoteFaucetSurferReward();
document.addEventListener("DOMContentLoaded", function(e){
	RemoteFaucetSurferReward.createMark(); //show on screen
	setTimeout(function(){
		RemoteFaucetSurferReward.initMark();
	},5000); //if page is not fully loaded for so lond, we still count it
}); 

window.addEventListener("load", function(e){ //we try to count page view when everything (banners!) loaded 
	RemoteFaucetSurferReward.initMark();
}); 


