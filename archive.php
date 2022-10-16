<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php');
?>
<div class="page-wrap archive-page <?php if ($this->options->bcool_animate !== "close" || !empty($this->options->bcool_animate)) : ?>animate__animated animate__<?php $this->options->bcool_animate() ?><?php endif; ?>">
    <div class="breadcrumbs">
        <div class="wrap wrap-center">
            <div class="wrap_float">
                <a href="<?php $this->options->siteUrl(); ?>">首页</a> / <a href="#"><?php $this->archiveTitle(array(
                        'category' => _t('分类'),
                        'search' => _t('关键字'),
                        'tag' => _t('标签'),
                        'author' => _t('作者')
                    ), '', ''); ?></a> / <span class="current"><?php $this->archiveTitle(array(
                        'category' => _t('%s'),
                        'search' => _t('包含关键字 %s'),
                        'tag' => _t('标签 %s'),
                        'author' => _t('%s')
                    ), '', ''); ?></span>
            </div>
        </div>
    </div>
    <div class="archive-header">
        <div class="wrap wrap-center">
            <div class="wrap_float">
                <div class="title-wrap">
                    <h1 class="page-title"><?php $this->archiveTitle(array(
                            'category' => _t('分类 %s 下的文章'),
                            'search' => _t('包含关键字 %s 的文章'),
                            'tag' => _t('标签 %s 下的文章'),
                            'author' => _t('%s 发布的文章')
                        ), '', ''); ?></h1>

                </div>
                <?php if ($this->is('category')) : ?>
                    <div class="post-description">
                        <?php echo $this->getDescription(); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="archive-body">
        <div class="wrap">
            <div class="wrap_float grid">
                <?php if ($this->have()) : ?>
                    <div class="portfolio">

                        <?php while ($this->next()) : ?>
                            <div class="portfolio-item p-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div class="content" href='<?php $this->permalink() ?>'>
                                    <div class="thumb">
                                        <img src="<?php $this->options->themeUrl('./assets/img/loading.gif'); ?>"
                                             data-src="<?php echo thumb($this); ?>" class="lazyload"/>
                                        <div class="widget">
                                            <div class="post-tags">
                                                <div class="tag">
                                                    #<?php $this->tags('</div><div class="tag">#', true, '暂无标签'); ?></div>
                                            </div>
                                            <a class="post-title" title="<?php $this->title() ?>">
                                                <?php $this->title('20', '...') ?>
                                            </a>
                                            <div class="post-info">
                                                <div class="post-author">
                                                    <div class="author-image">
                                                        <img src="<?php Gravatar($this->author->mail); ?>"
                                                             onerror="this.src='<?php fallbackGravatar(); ?>';" alt=""
                                                             class="image-cover">
                                                    </div>
                                                    <span><?php $this->author(); ?></span>
                                                </div>
                                                <div class="post-date"><i class="fa-regular fa-clock"></i>
                                                    <?php $this->date(); ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endwhile; ?>

                    </div>
                    <div class="page-load-status">
                        <div class="loader-ellips infinite-scroll-request">
                            <span class="loader-ellips__dot"></span>
                            <span class="loader-ellips__dot"></span>
                            <span class="loader-ellips__dot"></span>
                            <span class="loader-ellips__dot"></span>
                        </div>
                        <p class="infinite-scroll-last">到底啦～
                        </p>
                        <p class="infinite-scroll-error">加载错误</p>
                    </div>
                    <div class="ajaxloadpost" style="display:none">
                        <?php $this->pageLink('下一页', 'next'); ?>
                    </div>
                <?php else: ?>
                    <center>
                        <svg width="250px" height="251px" viewBox="0 0 250 251" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <title>Not Found</title>
                            <defs>
                                <linearGradient x1="50%" y1="30.8651676%" x2="50%" y2="100%" id="linearGradient-1">
                                    <stop stop-color="#FFFFFF" offset="0%"></stop>
                                    <stop stop-color="#F8F8F8" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="50%" y1="100%" x2="50%" y2="3.061617e-15%" id="linearGradient-2">
                                    <stop stop-color="#F8F8F8" offset="0%"></stop>
                                    <stop stop-color="#DBDBDB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="43.9527265%" y1="61.4404631%" x2="58.82%" y2="0%"
                                                id="linearGradient-3">
                                    <stop stop-color="#F9F9F9" offset="0%"></stop>
                                    <stop stop-color="#EBEBEB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="25.4854702%" y1="75.5043118%" x2="68.2803632%" y2="42.8961155%"
                                                id="linearGradient-4">
                                    <stop stop-color="#DFDFDF" offset="0%"></stop>
                                    <stop stop-color="#F2F2F2" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="50%" y1="100%" x2="50%" y2="3.061617e-15%" id="linearGradient-5">
                                    <stop stop-color="#F8F8F8" offset="0%"></stop>
                                    <stop stop-color="#DBDBDB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="43.8986124%" y1="61.4404631%" x2="58.8989258%" y2="0%"
                                                id="linearGradient-6">
                                    <stop stop-color="#F9F9F9" offset="0%"></stop>
                                    <stop stop-color="#EBEBEB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="25.4854702%" y1="75.5043118%" x2="68.2803632%" y2="42.8961155%"
                                                id="linearGradient-7">
                                    <stop stop-color="#DFDFDF" offset="0%"></stop>
                                    <stop stop-color="#F2F2F2" offset="100%"></stop>
                                </linearGradient>
                                <radialGradient cx="35.898299%" cy="34.6633728%" fx="35.898299%" fy="34.6633728%"
                                                r="125.721939%" id="radialGradient-8">
                                    <stop stop-color="#FFFFFF" offset="0%"></stop>
                                    <stop stop-color="#EEEEEE" offset="100%"></stop>
                                </radialGradient>
                                <linearGradient x1="50%" y1="100%" x2="50%" y2="3.061617e-15%" id="linearGradient-9">
                                    <stop stop-color="#F8F8F8" offset="0%"></stop>
                                    <stop stop-color="#DBDBDB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="44.1513912%" y1="61.4404631%" x2="58.5302457%" y2="0%"
                                                id="linearGradient-10">
                                    <stop stop-color="#F9F9F9" offset="0%"></stop>
                                    <stop stop-color="#EBEBEB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="25.4854702%" y1="75.5043118%" x2="68.2803632%" y2="42.8961155%"
                                                id="linearGradient-11">
                                    <stop stop-color="#DFDFDF" offset="0%"></stop>
                                    <stop stop-color="#F2F2F2" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="71.8961407%" y1="43.1597993%" x2="50%" y2="58.9250325%"
                                                id="linearGradient-12">
                                    <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
                                    <stop stop-color="#D8D8D8" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="50%" y1="100%" x2="50%" y2="3.061617e-15%" id="linearGradient-13">
                                    <stop stop-color="#F8F8F8" offset="0%"></stop>
                                    <stop stop-color="#DBDBDB" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="31.2193053%" y1="100%" x2="31.2193053%" y2="13.8568427%"
                                                id="linearGradient-14">
                                    <stop stop-color="#F1F1F1" offset="0%"></stop>
                                    <stop stop-color="#D1D1D1" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="25.4854702%" y1="75.5043118%" x2="68.2803632%" y2="42.8961155%"
                                                id="linearGradient-15">
                                    <stop stop-color="#F2F2F2" offset="0%"></stop>
                                    <stop stop-color="#DFDFDF" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient x1="66.7005134%" y1="28.4613384%" x2="29.4691329%" y2="67.828354%"
                                                id="linearGradient-16">
                                    <stop stop-color="#EBEBEB" offset="0%"></stop>
                                    <stop stop-color="#F2F2F2" offset="100%"></stop>
                                </linearGradient>
                            </defs>
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-1032.000000, -2471.000000)">
                                    <g transform="translate(782.000000, 2134.000000)">
                                        <g transform="translate(250.000000, 337.000000)">
                                            <circle fill="url(#linearGradient-1)" cx="125" cy="126" r="125"></circle>
                                            <g opacity="0.281133743" transform="translate(20.000000, 58.000000)">
                                                <polygon fill="url(#linearGradient-2)"
                                                         points="21 30.6382979 42 20 42 59.3617021 21 70"></polygon>
                                                <polygon fill="url(#linearGradient-3)"
                                                         transform="translate(10.500000, 45.000000) scale(-1, 1) translate(-10.500000, -45.000000) "
                                                         points="0 30.6382979 21 20 21 59.3617021 0 70"></polygon>
                                                <polygon fill="url(#linearGradient-4)"
                                                         transform="translate(21.000000, 19.742634) scale(-1, 1) rotate(-305.000000) translate(-21.000000, -19.742634) "
                                                         points="13.1544262 13.6469218 33.0451052 2.54044128 29.7542967 25.8724587 8.95489484 36.9448271"></polygon>
                                            </g>
                                            <g
                                            " opacity="0.281133743" transform="translate(91.000000, 5.000000)">
                                            <polygon fill="url(#linearGradient-5)"
                                                     points="27 38.6170213 54 25 54 75.3829787 27 89"></polygon>
                                            <polygon fill="url(#linearGradient-6)"
                                                     transform="translate(13.500000, 57.000000) scale(-1, 1) translate(-13.500000, -57.000000) "
                                                     points="0 38.6170213 27 25 27 75.3829787 0 89"></polygon>
                                            <polygon fill="url(#linearGradient-7)"
                                                     transform="translate(27.000000, 25.383387) scale(-1, 1) rotate(-305.000000) translate(-27.000000, -25.383387) "
                                                     points="16.9128337 17.5460423 42.4865638 3.26628164 38.2555243 33.2645898 11.5134362 47.500492"></polygon>
                                        </g>
                                        <circle fill="url(#radialGradient-8)" cx="117" cy="17" r="17"></circle>
                                        <g opacity="0.281133743" transform="translate(193.000000, 82.000000)">
                                            <polygon fill="url(#linearGradient-9)"
                                                     points="19 27.787234 38 18 38 54.212766 19 64"></polygon>
                                            <polygon fill="url(#linearGradient-10)"
                                                     transform="translate(9.500000, 41.000000) scale(-1, 1) translate(-9.500000, -41.000000) "
                                                     points="0 27.787234 19 18 19 54.212766 0 64"></polygon>
                                            <polygon fill="url(#linearGradient-11)"
                                                     transform="translate(19.000000, 18.050408) scale(-1, 1) rotate(-305.000000) translate(-19.000000, -18.050408) "
                                                     points="11.8242093 12.4810339 29.8979523 2.48651957 27.0039284 23.6548194 8.10204771 33.6142973"></polygon>
                                        </g>
                                        <polygon fill="url(#linearGradient-12)" opacity="0.645252046"
                                                 points="130.3867 120.871317 219.5 151.050408 162.914043 184.080183 119 138.605855"></polygon>
                                        <g transform="translate(63.000000, 58.000000)">
                                            <polygon fill="url(#linearGradient-13)"
                                                     points="57 83.3617021 114 54 114 118.638298 57 148"></polygon>
                                            <g transform="translate(77.000000, 89.000000)" fill="#DCDCDC"
                                               fill-rule="nonzero">
                                                <path d="M10.4994794,0 C4.70191118,0 0.00106198586,5.37239908 0,11.999405 C0,18.6287432 4.70084919,24 10.4994794,24 C16.2991092,24 21,18.6276009 21,11.999405 C21,5.37242287 16.300192,0 10.4994794,0 Z M15.6708102,10.8754393 C15.6708102,11.1550108 15.6505343,11.394711 15.6099825,11.5946657 L11.6781717,12.4795445 L11.6781717,14.2039449 L15.6099825,13.2727014 C15.6505343,13.4406187 15.6708102,13.6388119 15.6708102,13.8673349 C15.6708102,14.1480133 15.6505343,14.3870331 15.6099825,14.5878408 L11.6781717,15.5554221 L11.6781717,18.6301162 C11.5123948,18.6995292 11.343072,18.7653626 11.1653723,18.8266105 C10.9876964,18.8878853 10.8088306,18.9426436 10.6323209,18.9898887 C10.454645,19.0374459 10.2781352,19.077798 10.1004593,19.1114984 C9.92394952,19.1448766 9.75222313,19.1711785 9.58765994,19.1885266 L9.58765994,16.0698772 L5.81922244,16.9972539 C5.76434425,16.8469946 5.73695275,16.6235041 5.73695275,16.3244076 C5.73695275,16.2009702 5.74409215,16.0782119 5.75722864,15.9516391 C5.77153124,15.8259936 5.79178334,15.7061079 5.81924624,15.5916227 L9.58768374,14.6990739 L9.58768374,12.950022 L5.81924624,13.7981326 C5.76436804,13.646719 5.73697654,13.4226524 5.73697654,13.123556 C5.73697654,13.0013028 5.74411594,12.8775104 5.75725244,12.751214 C5.77155504,12.6258694 5.79180714,12.5064096 5.81927004,12.3913186 L8.7684375,11.754869 L5,5.93281091 C5.17767589,5.87479383 5.37208177,5.82106028 5.58317005,5.77166908 C5.79661434,5.72072533 5.99818342,5.67895479 6.1889958,5.64615894 C6.37980819,5.61336309 6.57773618,5.58640998 6.78289876,5.56412144 C6.98806134,5.54179765 7.17163913,5.53019307 7.33624991,5.52883925 L10.6944574,10.9052498 L13.9930272,4.38117588 C14.169537,4.32497338 14.3507826,4.27469985 14.5355978,4.23059941 C14.7180571,4.18695801 14.9076796,4.14763644 15.098492,4.11484059 C15.2893044,4.08204474 15.480093,4.05590306 15.6709054,4.03531806 C15.8628838,4.01445538 16.0406073,4.00272648 16.2039568,4 L12.4975131,10.9489786 L15.6100539,10.2772963 C15.6505343,10.4482966 15.6708102,10.6469163 15.6708102,10.8754393 Z"
                                                      id="形状"></path>
                                            </g>
                                            <polygon fill="url(#linearGradient-14)"
                                                     transform="translate(28.500000, 101.000000) scale(-1, 1) translate(-28.500000, -101.000000) "
                                                     points="0 83.3617021 57 54 57 118.638298 0 148"></polygon>
                                            <path d="M88.4330066,9.29950327 L36.3746055,38.0870344 L25.6448524,99.0071984 L80.090661,70.3194802 L88.4330066,9.29950327 Z"
                                                  id="矩形备份-5" stroke="#F8F8F8" stroke-width="2"
                                                  fill="url(#linearGradient-15)"
                                                  transform="translate(57.000000, 54.151225) scale(-1, 1) rotate(-305.000000) translate(-57.000000, -54.151225) "></path>
                                        </g>
                                        <polygon fill="url(#linearGradient-16)"
                                                 points="63 112 41 138.638298 100 173 120 141.361702"></polygon>
                                        <polygon fill="#C3C3C3"
                                                 points="177 112 193 127.742634 177 119.871317"></polygon>
                                        <path d="M114.686282,113.774093 C98.8954274,111.521112 91,102.187778 91,85.7740928 C91,61.1535646 119.619867,63.1039062 125.96515,74.4389995 C132.310432,85.7740928 94.0849618,84.4616779 108.482575,56.7857788 C109.883877,54.6276604 111.95178,52.6990675 114.686282,51"
                                              id="路径-8" stroke="#D1CECE" stroke-width="2" stroke-dasharray="2"></path>
                                        <g id="butterfly_f"
                                           transform="translate(122.000000, 41.000000) rotate(10.000000) translate(-122.000000, -41.000000) translate(113.000000, 31.000000)"
                                           fill="#C60727" fill-rule="nonzero">
                                            <path d="M6.9274875,0.12065 C6.9274875,0.16131666 7.09022084,0.50711666 7.29362084,0.87318334 C8.33095418,2.70378334 8.5952875,3.88351668 8.5952875,6.46671668 C8.5952875,7.84978334 8.5342875,9.23291668 8.45302084,9.57871668 C8.3512875,10.0465167 8.39195418,10.1889167 8.6156875,10.1889167 C8.92082084,10.1889167 9.02255416,9.90411668 9.44962084,7.68705002 C9.61235418,6.75145002 9.65302084,5.85651668 9.53102084,4.83951668 C9.36835418,3.41571668 9.30735418,3.15125002 8.7580875,2.01225002 C8.26995416,0.97491666 6.9274875,-0.40821666 6.9274875,0.12065 Z M2.7984875,2.54111666 C1.49675416,3.25298334 1.1102875,4.10725 1.1712875,6.20225 C1.21202084,7.68705 1.39502084,8.45998334 2.1272875,10.1889167 C2.20862084,10.39225 2.04595416,10.6159833 1.63915416,10.8601167 C0.45942082,11.5719833 0.0119541602,12.2227833 0.0119541602,13.30085 C0.0119541602,15.3551167 1.8628875,16.0873833 4.1612875,14.9483167 C4.73082084,14.6635833 5.34095416,14.3177833 5.5036875,14.17545 C6.1952875,13.5855833 6.23595416,13.6465167 6.15455416,15.4771167 C6.0528875,17.7145833 6.33762082,18.50785 7.43602082,18.91465 C8.08688748,19.1383167 8.24962082,19.11805 9.04282082,18.7315833 C9.95808748,18.3045167 10.3242875,17.75525 10.4258875,16.5959167 C10.4869541,16.00605 10.5276875,15.9857833 11.8090875,15.8433167 C13.5989541,15.66025 14.6362875,15.41625 15.3685541,15.0093833 C16.7109541,14.2771833 17.0974208,13.6465833 17.0974208,12.2635167 C17.0974208,11.4295167 16.9958208,11.1651167 16.4872875,10.6363833 C14.9414208,9.00918334 12.7446875,9.00918334 9.42935412,10.6363833 C8.65642078,11.00245 7.98522078,11.3279167 7.90388746,11.3685833 C7.82248746,11.4091833 7.7818208,10.3109167 7.7818208,8.92778334 C7.80215414,6.30398334 7.61908746,5.42938334 6.78515414,4.06658334 C5.89015416,2.58178334 4.0188875,1.86985 2.7984875,2.54111666 L2.7984875,2.54111666 Z M13.1514875,6.03951666 C11.9921542,6.44631666 11.0971542,7.05651666 10.4869542,7.87011666 C9.93782082,8.60238332 9.89702082,9.00918332 10.4258875,8.52098332 C10.6903542,8.25658332 10.9140208,8.13458332 12.3581542,7.32098332 C13.2532208,6.81244998 14.6566208,6.83278332 15.6938875,7.36164998 C16.6295542,7.82944998 16.8736208,7.74811664 16.5074875,7.07684998 C16.0194208,6.18191666 14.3108875,5.65311666 13.1514875,6.03951666 Z"
                                                  id="形状"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            </g>
                        </svg>
                        <br><br>
                        <h4>啊哦~这里空空如也</h4>
                    </center>
                <?php endif ?>
            </div>
        </div>
    </div>
<?php $this->need('footer.php'); ?>