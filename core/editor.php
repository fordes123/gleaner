<?php
Typecho_Plugin::factory('admin/write-post.php')->bottom = array('editor', 'button');
Typecho_Plugin::factory('admin/write-page.php')->bottom = array('editor', 'button');
class editor
{
    public static function button(){
		?><style>.wmd-button-row {
    height: auto;
}</style>
		<script> 
          $(document).ready(function(){
          	$('#wmd-button-row').append('<li class="wmd-button" id="wmd-ptsfq-button" title="普通手风琴折叠"><span style="background: none;margin-top:5px;font-size: large;text-align: center;color: #999999;font-family: serif;"><svg t="1631537772123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2950" width="16" height="16"><path d="M930.702222 837.802667c20.081778 0 36.408889 16.213333 36.408889 36.238222a36.295111 36.295111 0 0 1-36.408889 36.181333H93.297778a36.295111 36.295111 0 0 1-36.408889-36.181333c0-20.024889 16.327111-36.238222 36.408889-36.238222h837.404444z m-4.551111-240.981334c20.081778 0 36.408889 16.213333 36.408889 36.238223a36.295111 36.295111 0 0 1-36.408889 36.181333H434.631111a36.295111 36.295111 0 0 1-36.408889-36.181333c0-20.024889 16.327111-36.238222 36.408889-36.238223h491.52zM238.535111 364.885333a10.069333 10.069333 0 0 1 16.384 7.793778v278.471111a10.126222 10.126222 0 0 1-16.384 7.793778L60.700444 519.736889a9.841778 9.841778 0 0 1 0-15.644445l177.834667-139.207111z m687.616-10.126222c20.081778 0 36.408889 16.213333 36.408889 36.181333a36.295111 36.295111 0 0 1-36.408889 36.238223H434.631111A36.295111 36.295111 0 0 1 398.222222 390.940444c0-19.968 16.327111-36.181333 36.408889-36.181333h491.52zM930.702222 113.777778c20.081778 0 36.408889 16.213333 36.408889 36.181333a36.295111 36.295111 0 0 1-36.408889 36.238222H93.297778A36.295111 36.295111 0 0 1 56.888889 149.959111C56.888889 129.991111 73.216 113.777778 93.297778 113.777778h837.404444z" fill="#666666" p-id="2951"></path></svg></span></li>');
				if($('#wmd-button-row').length !== 0){
					$('#wmd-ptsfq-button').click(function(){
						var rs = "{bcool-accordion type=stand title=普通手风琴折叠标题}普通手风琴折叠内容{/bcool-accordion}";
						ptsfq(rs);
					})
				}


				function ptsfq(tag) {
					var myField;
					if (document.getElementById('text') && document.getElementById('text').type == 'textarea') {
						myField = document.getElementById('text');
					} else {
						return false;
					}
					if (document.selection) {
						myField.focus();
						sel = document.selection.createRange();
						sel.text = tag;
						myField.focus();
					}
					else if (myField.selectionStart || myField.selectionStart == '0') {
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						var cursorPos = startPos;
						myField.value = myField.value.substring(0, startPos)
						+ tag
						+ myField.value.substring(endPos, myField.value.length);
						cursorPos += tag.length;
						myField.focus();
						myField.selectionStart = cursorPos;
						myField.selectionEnd = cursorPos;
					} else {
						myField.value += tag;
						myField.focus();
					}
				}

				


			});
</script>
<script> 
          $(document).ready(function(){
          	$('#wmd-button-row').append('<li class="wmd-button" id="wmd-xxsfq-button" title="线性手风琴折叠"><span style="background: none;margin-top:5px;font-size: large;text-align: center;color: #999999;font-family: serif;"><svg t="1631538825732" class="icon" viewBox="0 0 1102 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121" width="16" height="16"><path d="M1063.384615 498.609231a49.467077 49.467077 0 0 0-15.044923-36.155077 55.296 55.296 0 0 0-75.382154 1.024L551.384615 864.728615 129.969231 463.556923a55.296 55.296 0 0 0-75.382154-1.024 49.467077 49.467077 0 0 0-15.202462 36.076308 49.624615 49.624615 0 0 0 16.147693 35.682461l457.097846 435.121231a55.138462 55.138462 0 0 0 19.062154 11.579077c2.363077 0.945231 4.962462 0.945231 7.483077 1.496615 3.938462 0.787692 7.955692 2.126769 12.20923 2.12677 4.174769 0 8.113231-1.260308 12.130462-2.12677 2.363077-0.630154 5.041231-0.630154 7.404308-1.496615a54.350769 54.350769 0 0 0 19.062153-11.579077l457.097847-435.121231a49.624615 49.624615 0 0 0 16.30523-35.682461z m0-408.812308a49.467077 49.467077 0 0 0-15.044923-35.997538 55.217231 55.217231 0 0 0-75.303384 1.024L551.384615 455.916308 129.969231 54.744615A55.296 55.296 0 0 0 54.587077 53.720615a49.073231 49.073231 0 0 0 1.024 71.68l457.097846 435.27877a55.138462 55.138462 0 0 0 19.062154 11.579077c2.363077 0.945231 4.962462 0.945231 7.404308 1.575384 3.938462 0.787692 7.955692 2.048 12.20923 2.048 4.174769 0 8.113231-1.181538 12.209231-2.048 2.363077-0.630154 5.041231-0.630154 7.325539-1.575384a54.350769 54.350769 0 0 0 19.062153-11.579077l457.176616-435.2a49.624615 49.624615 0 0 0 16.226461-35.603693z" fill="#939699" p-id="3122"></path></svg></span></li>');
				if($('#wmd-button-row').length !== 0){
					$('#wmd-xxsfq-button').click(function(){
						var rs = "{bcool-accordion type=line title=线性手风琴折叠标题}线性手风琴折叠内容{/bcool-accordion}";
						xxsfq(rs);
					})
				}


				function xxsfq(tag) {
					var myField;
					if (document.getElementById('text') && document.getElementById('text').type == 'textarea') {
						myField = document.getElementById('text');
					} else {
						return false;
					}
					if (document.selection) {
						myField.focus();
						sel = document.selection.createRange();
						sel.text = tag;
						myField.focus();
					}
					else if (myField.selectionStart || myField.selectionStart == '0') {
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						var cursorPos = startPos;
						myField.value = myField.value.substring(0, startPos)
						+ tag
						+ myField.value.substring(endPos, myField.value.length);
						cursorPos += tag.length;
						myField.focus();
						myField.selectionStart = cursorPos;
						myField.selectionEnd = cursorPos;
					} else {
						myField.value += tag;
						myField.focus();
					}
				}

				

			});
</script>
		<script> 
          $(document).ready(function(){
          	$('#wmd-button-row').append('<li class="wmd-button" id="wmd-hfkj-button" title="回复可见"><span style="background: none;margin-top:5px;font-size: large;text-align: center;color: #999999;font-family: serif;"><svg t="1631542611669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4626" width="16" height="16"><path d="M850.858667 254.72c103.936 71.68 173.226667 168.362667 173.141333 257.109333 0 165.888-251.989333 365.909333-512 365.909334-80.213333 0-160.426667-19.541333-232.704-51.456l55.04-55.04c53.76 20.565333 113.578667 33.28 177.664 33.28 257.877333 0 438.869333-199.253333 438.869333-292.693334 0-54.357333-56.576-140.117333-152.405333-204.714666zM512 146.346667c69.973333 0 139.093333 13.909333 202.752 37.632l-56.746667 56.746666A509.269333 509.269333 0 0 0 512 219.392C261.461333 219.392 73.130667 415.146667 73.130667 511.829333c0 49.066667 48.213333 123.562667 128.512 185.173334l-52.309334 52.309333C59.221333 679.765333 0 592.042667 0 511.829333 0 345.6 256.085333 146.261333 512 146.261333z" p-id="4627"></path><path d="M675.498667 430.165333A182.869333 182.869333 0 0 1 430.08 675.584zM512 329.130667c17.493333 0 34.474667 2.474667 50.517333 7.082666L336.128 562.346667A183.04 183.04 0 0 1 512 329.130667zM840.192 101.546667a42.666667 42.666667 0 0 1 65.28 54.442666l-4.949333 5.973334-724.053334 724.053333a42.666667 42.666667 0 0 1-65.28-54.442667l4.949334-5.973333L840.192 101.546667z" p-id="4628"></path></svg></span></li>');
				if($('#wmd-button-row').length !== 0){
					$('#wmd-hfkj-button').click(function(){
						var rs = "{bcool-hide}隐藏内容{/bcool-hide}";
						hfkj(rs);
					})
				}


				function hfkj(tag) {
					var myField;
					if (document.getElementById('text') && document.getElementById('text').type == 'textarea') {
						myField = document.getElementById('text');
					} else {
						return false;
					}
					if (document.selection) {
						myField.focus();
						sel = document.selection.createRange();
						sel.text = tag;
						myField.focus();
					}
					else if (myField.selectionStart || myField.selectionStart == '0') {
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						var cursorPos = startPos;
						myField.value = myField.value.substring(0, startPos)
						+ tag
						+ myField.value.substring(endPos, myField.value.length);
						cursorPos += tag.length;
						myField.focus();
						myField.selectionStart = cursorPos;
						myField.selectionEnd = cursorPos;
					} else {
						myField.value += tag;
						myField.focus();
					}
				}

				

			});
</script>

<script> 
          $(document).ready(function(){
          	$('#wmd-button-row').append('<li class="wmd-button" id="wmd-todocheck-button" title="打勾已完成"><span style="background: none;margin-top:5px;font-size: large;text-align: center;color: #999999;font-family: serif;"><svg t="1631543018887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5633" width="16" height="16"><path d="M128 85.333333h768a42.666667 42.666667 0 0 1 42.666667 42.666667v768a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 0 1 42.666667-42.666667z m42.666667 85.333334v682.666666h682.666666V170.666667H170.666667z m122.154666 262.869333a21.333333 21.333333 0 0 1 30.165334 0.106667l126.378666 127.296 251.050667-233.877334a21.333333 21.333333 0 0 1 30.165333 1.066667l29.077334 31.210667a21.333333 21.333333 0 0 1-1.066667 30.144L462.165333 665.642667a21.333333 21.333333 0 0 1-29.674666-0.576l-170.048-171.306667a21.333333 21.333333 0 0 1 0.106666-30.165333l30.293334-30.08z" p-id="5634"></path></svg></span></li>');
				if($('#wmd-button-row').length !== 0){
					$('#wmd-todocheck-button').click(function(){
						var rs = "{bcool-todo type=true}Todolist已完成的内容{/bcool-todo}";
						todocheck(rs);
					})
				}


				function todocheck(tag) {
					var myField;
					if (document.getElementById('text') && document.getElementById('text').type == 'textarea') {
						myField = document.getElementById('text');
					} else {
						return false;
					}
					if (document.selection) {
						myField.focus();
						sel = document.selection.createRange();
						sel.text = tag;
						myField.focus();
					}
					else if (myField.selectionStart || myField.selectionStart == '0') {
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						var cursorPos = startPos;
						myField.value = myField.value.substring(0, startPos)
						+ tag
						+ myField.value.substring(endPos, myField.value.length);
						cursorPos += tag.length;
						myField.focus();
						myField.selectionStart = cursorPos;
						myField.selectionEnd = cursorPos;
					} else {
						myField.value += tag;
						myField.focus();
					}
				}
			});
</script>
<script> 
          $(document).ready(function(){
          	$('#wmd-button-row').append('<li class="wmd-button" id="wmd-todonotcheck-button" title="打叉未完成"><span style="background: none;margin-top:5px;font-size: large;text-align: center;color: #999999;font-family: serif;"><svg t="1631543115096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7147" width="16" height="16"><path d="M768 102.4H256C168.96 102.4 102.4 168.96 102.4 256v512c0 87.04 66.56 153.6 153.6 153.6h512c87.04 0 153.6-66.56 153.6-153.6V256c0-87.04-66.56-153.6-153.6-153.6z m51.2 665.6c0 30.72-20.48 51.2-51.2 51.2H256c-30.72 0-51.2-20.48-51.2-51.2V256c0-30.72 20.48-51.2 51.2-51.2h512c30.72 0 51.2 20.48 51.2 51.2v512z" p-id="7148"></path></svg></span></li>');
				if($('#wmd-button-row').length !== 0){
					$('#wmd-todonotcheck-button').click(function(){
						var rs = "{bcool-todo type=false}Todolist待完成的内容{/bcool-todo}";
						todonotcheck(rs);
					})
				}


				function todonotcheck(tag) {
					var myField;
					if (document.getElementById('text') && document.getElementById('text').type == 'textarea') {
						myField = document.getElementById('text');
					} else {
						return false;
					}
					if (document.selection) {
						myField.focus();
						sel = document.selection.createRange();
						sel.text = tag;
						myField.focus();
					}
					else if (myField.selectionStart || myField.selectionStart == '0') {
						var startPos = myField.selectionStart;
						var endPos = myField.selectionEnd;
						var cursorPos = startPos;
						myField.value = myField.value.substring(0, startPos)
						+ tag
						+ myField.value.substring(endPos, myField.value.length);
						cursorPos += tag.length;
						myField.focus();
						myField.selectionStart = cursorPos;
						myField.selectionEnd = cursorPos;
					} else {
						myField.value += tag;
						myField.focus();
					}
				}
			});
</script>
<?php
}}