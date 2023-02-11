<?php
/**
 * typecho主题，修改自 <a href='https://www.github.com/whitebearcode/typecho-bearcool'>typecho-bearcool</a>
 * 主题演示：<a href='https://fordes.top'>fordes.top</a>
 * Github：<a href='https://github.com/fordes123/gleaner'>fordes123/gleaner</a>
 *
 * @package gleaner
 * @author fordes
 * @version 1.2.3
 * @link https://blog.fordes.top/
 */
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
?>

<?php $this->need('header.php'); ?>
<section class="centered ">
    <div class="about">
        <div class="avatar">
            <img class="lazy"
                 src="<?php if (empty($this->options->bcool_avatar)) $this->options->themeUrl('/assets/img/head.png'); else $this->options->bcool_avatar(); ?>"
                 data-src="<?php if (empty($this->options->bcool_avatar)) $this->options->themeUrl('/assets/img/head.png'); else $this->options->bcool_avatar(); ?>"
                 error-src="<?php fallbackGravatar(); ?>" alt=""/>
            <h1><?php $this->options->bcool_nickname(); ?></h1>
            <h2><?php $this->options->bcool_slogan() ?><br></h2>
            <ul><?php indexAppInfo() ?></ul>
        </div>
</section>
<?php $this->need('footer.php'); ?>
