<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!--footer -->
<div class="footer">
    <div class="wrap">
        <div class="wrap_float">
            <div class="footer-content">
                <div class="wrap-center">
                    <div class="menu">
                        <ul>
                            <li>
                                <span>© 2019 - <?php echo date("Y"); ?>&nbsp;</span><a><?php $this->options->bcool_title() ?></a>
                            </li>
                            <li>Poweed by <a href="https://www.typecho.org/" target="_blank">Typecho</a>&nbsp;• <a
                                        href="https://www.github.com/whitebearcode/typecho-bearcool" target="_blank">Gleaner</a>
                            </li>
                            <?php if ($this->options->bcool_icp) : ?>
                                <li><a href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
                                       target="_blank"><?php $this->options->bcool_icp(); ?></a></li> <?php endif; ?>
                        </ul>
                    </div>
                </div>
                <?php if (!$this->is('index')) : ?>
                    <div class="footer-right"><a href="#" class="login-link"><i class="fa-solid fa-circle-up"></i> 返回顶部</a>
                    </div><?php endif; ?>
            </div>
        </div>
    </div>
</div>
<div class="overlay" id="overlay"></div>
</div>
</div>
<div style="display: none;">
    <div class="modal modal_default modal_success" id="modal-qrcode">
        <div class="modal_wrap">
            <center><h2 class="title">微信分享二维码</h2>
                <div class="subtitle">
                    <div id="qrcode"></div>
                </div>
        </div>
        </center>
        <div class="modal_close"></div>
    </div>
</div>
</div>
<?php if ($this->is('index')) : ?>
    <style> .index-anchor {
            background-image: <?php if (empty($this->options->bcool_lightcolor)) echo 'linear-gradient(0deg, #4584b4, #1e4877)'; else echo $this->options->bcool_lightcolor; ?>;
        }

        .dark .index-anchor {
            background-image: <?php if (empty($this->options->bcool_darkcolor)) echo 'linear-gradient(0deg,#ffa17f,#00223e)'; else echo $this->options->bcool_darkcolor ?>;
        }</style>
    <?php if ($this->options->debug_mode) : ?>
        <script type="text/javascript"
                src="<?php $this->options->themeUrl('./assets/js/webgl/ThreeWebGL.js'); ?>"></script>
        <script type="text/javascript"
                src="<?php $this->options->themeUrl('./assets/js/webgl/ThreeExtras.js'); ?>"></script>
        <script type="text/javascript"
                src="<?php $this->options->themeUrl('./assets/js/webgl/Detector.js'); ?>"></script>
    <?php else : ?>
        <script type="text/javascript"
                src="//fastly.jsdelivr.net/gh/fordes123/gleaner/assets/js/webgl/ThreeWebGL.js"></script>
        <script type="text/javascript"
                src="//fastly.jsdelivr.net/gh/fordes123/gleaner/assets/js/webgl/ThreeExtras.js"></script>
        <script type="text/javascript"
                src="//fastly.jsdelivr.net/gh/fordes123/gleaner/assets/js/webgl/Detector.js"></script>
    <?php endif; ?>
    <script id="vs" type="x-shader/x-vertex">
         varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }

    </script>
    <script id="fs" type="x-shader/x-fragment">
         uniform sampler2D map; uniform vec3 fogColor; uniform float fogNear; uniform float fogFar; varying vec2 vUv; void main() { float depth = gl_FragCoord.z / gl_FragCoord.w; float fogFactor = smoothstep( fogNear, fogFar, depth ); gl_FragColor = texture2D( map, vUv ); gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 ); gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor ); }

    </script>
<?php endif; ?>
<?php if ($this->options->debug_mode) : ?>
    <script src="<?php $this->options->themeUrl('./assets/js/lazyload.js'); ?>" type="application/javascript"></script>
    <script src="<?php $this->options->themeUrl('./assets/js/scripts.min.js'); ?>" type="application/javascript"></script>
    <script src="<?php $this->options->themeUrl('./assets/js/jquery.fancybox.min.js'); ?>"
            type="application/javascript"></script>

<?php else : ?>
    <script src="//lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/fancybox/3.5.7/jquery.fancybox.min.js"
            type="application/javascript"></script>
    <script src="//fastly.jsdelivr.net/gh/fordes123/gleaner/assets/js/lazyload.js"
            type="application/javascript"></script>
    <script src="//fastly.jsdelivr.net/gh/fordes123/gleaner/assets/js/scripts.min.js?>"
            type="application/javascript"></script>
<?php endif; ?>

<script>clickToHref();

    function clickToHref() {
        var eles = document.querySelectorAll("div[href]");
        eles.forEach(function (item) {
            item.addEventListener("click", function () {
                var href = item.getAttribute("href");
                var target = item.getAttribute("target");
                if (!target) {
                    location.href = href
                } else {
                    window.open(href, target)
                }
            })
        })
    }</script>
<?php if ($this->is('post') || $this->is('page')) : ?>
    <script> /*生成文章二维码*/
        new QRCode(document.getElementById("qrcode"), {
            rendor: 'canvas',
            text: '<?php $this->permalink() ?>',
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });</script><?php endif; ?>
<?php if (!($this->is('post') || $this->is('page'))) : ?><?php if ($this->options->debug_mode) : ?>
    <script src="<?php $this->options->themeUrl('./assets/js/infinite-scroll.pkgd.min.js'); ?>"
            type="text/javascript"></script> <?php else : ?>
    <script src="//lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery-infinitescroll/4.0.1/infinite-scroll.pkgd.min.js"></script> <?php endif; ?>
    <script> lazyload();
        if ($('.ajaxloadpost .next').length > 0) {
            $('.waterfalls').infiniteScroll({
                path: '.next',
                append: '.box',
                hideNav: '.ajaxloadpost',
                status: '.page-load-status',
                history: false,
                scrollThreshold: 100
            });
            $('.waterfalls').on('append.infiniteScroll', function (event, response, path) {
                lazyload();
                clickToHref();
            });
        }</script><?php endif; ?>
<?php $this->footer(); ?>
</body>
</html>