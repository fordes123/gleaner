<?php function ShortCode($post, $t, $login)
{
    $options = Helper::options();
    $content = $post;/*回复可见*/
    if (strpos($content, '{bcool-hide') !== false) {
        $db = Typecho_Db::get();
        $hasComment = $db->fetchAll($db->select()->from('table.comments')->where('cid = ?', $t->cid)->where('mail = ?', $t->remember('mail', true))->limit(1));
        if ($hasComment || $login) {
            $content = preg_replace("/\{bcool-hide\}(.*?)\{\/bcool-hide\}/sm", '<blockquote><p>$1</p></blockquote>', $post);
        } else {
            $content = preg_replace("/\{bcool-hide\}(.*?)\{\/bcool-hide\}/sm", '<blockquote><p>此处内容需要评论回复后方可阅读。</p></blockquote>', $post);
        }
    }/*Todolist*/
    if (strpos($content, '{bcool-todo') !== false) {
        if (strpos($content, '{bcool-todo type=true') !== false) {
            $content = preg_replace('/\{bcool-todo type=true\}(.*?)\{\/bcool-todo\}/sm', '<ul class="checklist-ul"><li>$1</li></ul>', $content);
        }
        if (strpos($content, '{bcool-todo type=false') !== false) {
            $content = preg_replace('/\{bcool-todo type=false\}(.*?)\{\/bcool-todo\}/sm', '<ul class="checklist-ul"><li class="disable-li">$1</li></ul>', $content);
        }
    }/*手风琴折叠*/
    if (strpos($content, '{bcool-accordion') !== false) {
        if (strpos($content, '{bcool-accordion type=stand') !== false) {
                    $content = preg_replace('/\{bcool-accordion type=stand title=(.*?)\}(.*?)\{\/bcool-accordion\}/sm', '<div class="accordion-item"><div class="accordion-item-title"><span>$1</span></div><div class="accordion-item-content" style="display: none;"><p>$2</p></div></div>', $content);
        }
        if (strpos($content, '{bcool-accordion type=line') !== false) {
            $content = preg_replace('/\{bcool-accordion type=line title=(.*?)\}(.*?)\{\/bcool-accordion\}/sm', '<div class="accordion-block with-border"><div class="accordion-item"><div class="accordion-item-title"><span>$1</span></div><div class="accordion-item-content" style="display: none;"><p>$2</p></div></div></div>', $content);
        }
    }
    $pattern = '/\<img.*?src\=\"(.*?)\"[^>]*>/i';
    $replacement = '<img class="bearmark" data-fancybox="gallery" data-src="$1" src="$1" alt="'.$t->title.'" title="点击放大图片">';
    $content = preg_replace($pattern, $replacement, "<div id=\"bearcool-images\">" . $content . "</div>");
    echo $content;
}