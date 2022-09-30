<?php

/**
 * 归档页
 *
 * @package custom
 */
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
$this->need('header.php'); ?>
    <div class="page-wrap">
    <div class="page-wrap-content">
    <div class="post-single-wrap sticky-parent">
        <div class="single-content wp-content">
            <div class="wrap wrap-center">
                <div class="wrap_float">

                    <section
                            class="articles-list <?php if ($this->options->bcool_animate !== "close" || !empty($this->options->bcool_animate)) : ?>animate__animated animate__<?php $this->options->bcool_animate() ?><?php endif; ?>">
                        <?php
                        $stat = Typecho_Widget::widget('Widget_Stat');
                        $this->widget('Widget_Contents_Post_Recent', 'pageSize=' . $stat->publishedPostsNum)->to($archives);
                        $year = 0;
                        $mon = 0;
                        $i = 0;
                        $j = 0;
                        $output = '<section>';
                        while ($archives->next()) {
                            $year_tmp = date('Y', $archives->created);
                            if ($year != $year_tmp) {
                                $year = $year_tmp;
                                $output .= '<h2>' . $year . '</h2>';
                            }
                            if ($this->options->PjaxOption && $archives->hidden) {
                                $output .= '<div class="post"><a href="' . $archives->permalink . '"><div class="post-row"><time>' . date('M j', $archives->created) . '</time><h3>' . $archives->title . '</h3></div></a></div>';
                            } else {
                                $output .= '<div class="post"><a href="' . $archives->permalink . '"><div class="post-row"><time>' . date('M j', $archives->created) . '</time><h3>' . $archives->title . '</h3></div></a></div>';
                            }
                        }
                        $output .= '</section>';
                        echo $output;
                        ?>
                    </section>

                </div>
            </div>
        </div>
    </div>

<?php $this->need('footer.php'); ?>