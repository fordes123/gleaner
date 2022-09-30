<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?> <?php $this->need('header.php'); ?>
<div class="single-header header-wide  <?php if ($this->options->bcool_animate !== "close" || !empty($this->options->bcool_animate)): ?>animate__animated animate__<?php $this->options->bcool_animate() ?><?php endif; ?>">
    <div class="wrap wrap-center">
        <div class="wrap_float">
            <div class="breadcrumbs"><a href="<?php $this->options->siteUrl(); ?>">首页</a> / <a href="#">页面</a> / <span
                        class="current"><?php $this->title() ?></span></div>
            <h1 class="page-title"><?php $this->title() ?></h1>
            <div class="post-info">
                <div class="post-author post-info-author">
                    <div class="author-image"><img src="<?php Gravatar($this->author->mail); ?>" alt=""
                                                   onerror="<?php fallbackGravatar(); ?>"
                                                   class="image-cover"></div>
                    <span><?php $this->author(); ?></span></div>
                <div class="post-date post-info-date">
                    <i class="fa-regular fa-clock"></i><?php $this->date(); ?>
                </div>
                <?php if ($this->options->bcool_views || $this->user->hasLogin()) : ?>
                    <div class="post-views post-info-views">
                        <i class="fa-regular fa-eye"></i><?php get_post_view($this) ?>
                    </div>
                <?php else : get_post_view($this, false);
                endif; ?>
            </div>
        </div>
    </div>
</div>
<div class="page-wrap">
    <div class="page-wrap-content">
        <div class="post-single-wrap sticky-parent">
            <div class="share-block">
                <div class="share-block-main js-share-block-main">
                    <div class="socials"><a href="<?php share($this, 'qq'); ?>" class="soc-link" data-title="QQ"><i
                                    class="fab fa-qq fa-lg"></i></a><a class="soc-link getModal" data-title="Wechat"
                                                                       data-href="#modal-qrcode"><i
                                    class="fab fa-weixin fa-lg"></i></a><a href="<?php share($this, 'weibo'); ?>"
                                                                           class="soc-link" data-title="Weibo"><i
                                    class="fab fa-weibo fa-lg"></i></a><a href="<?php share($this, 'facebook'); ?>"
                                                                          class="soc-link" data-title="Facebook"><i
                                    class="fab fa-facebook-f fa-lg"></i></a>
                        <div class="soc-link show-more-socials" style="display: none;">
                            <div><i class="fas fa-ellipsis-h fa-lg"></i></div>
                        </div>
                    </div>
                    <div class="share-block-item js-anchor link-to-comments" data-href="#comments-section">
                        <div class="comments-count">
                            <span><?php $this->commentsNum(_t('0'), _t('1'), _t('%d')); ?></span></div>
                    </div>
                </div>
                <div class="share-block-item mobile-item js-mobile-share-show mobile-share-show-btn">
                    <div class="show-mobile-icon"><i class="fas fa-share-alt fa-2x"></i></div>
                </div>
            </div>
            <div class="single-content wp-content">
                <div class="wrap wrap-center">
                    <div class="wrap_float">
                        <p><?php echo ShortCode($this->content, $this, $this->user->hasLogin()); ?></p></div>
                </div>
            </div>
        </div><?php $this->need('comments.php'); ?> <?php $this->need('footer.php'); ?>
