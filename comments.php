<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
  <?php $this->comments()->to($comments); ?>
<?php function threadedComments($comments, $options) {
  
    $commentClass = '';
    if ($comments->authorId) {
        if ($comments->authorId == $comments->ownerId) {
            $commentClass .= ' comment-by-author';  //如果是文章作者的评论添加 .comment-by-author 样式
        } else {
            $commentClass .= ' comment-by-user';  //如果是评论作者的添加 .comment-by-user 样式
        }
    } 
    $commentLevelClass = $comments->_levels > 0 ? ' comment-child' : ' comment-parent';  //评论层数大于0为子级，否则是父级
    
?>

<div id="li-<?php $comments->theId(); ?>" class="comment-body<?php 
if ($comments->levels > 0) {
    echo ' comment-child';
    $comments->levelsAlt(' comment-level-odd', ' comment-level-even');
} else {
    echo ' comment-parent';
}
$comments->alt(' comment-odd', ' comment-even');
echo $commentClass;
?>">
    <?php if(!getPermalinkFromCoid($comments->parent)):?>
        <div class="comment-item">
            <?php endif; ?>
    <div id="<?php $comments->theId(); ?>">
        
                                            <div class="comment-item-userpic">
                                                <img src="<?php Gravatar($comments->mail); ?>s=100" alt="" class="image-cover">
                                            </div>
        <div class="comment-item-name">
                <?php $comments->author(); ?> (<?php 
        if ($comments->authorId == $comments->ownerId) {
             echo '作者';
             }else if ($comments->authorId !== $comments->ownerId){
                  echo '读者';
             }
        
        ?>)
                </div>
           <div class="comment-item-date"><?php $comments->date('Y-m-d H:i'); ?></div>
           <div class="comment-item-reply-for"><?php echo getPermalinkFromCoid($comments->parent); ?></div>
                                            <div class="comment-item-text">
                                                <?php $comments->content(); ?>
                                            </div>
                                            <div class="reply-link"><?php $comments->reply(); ?></div>
                                      </div></div></div>
                
    <?php if ($comments->children) { ?>
       <div class="comment-item reply comment-children" style="margin-left:12px">
            <?php $comments->threadedComments($options); ?>
</div>


    <?php } ?>
<?php } ?>


        
             <div class="comments-section" id="comments-section">
                        <div class="wrap wrap-center">
                            <div class="wrap_float">
                             
                                <h2  id="response" class="title">评论区 <span class="comments-count"><?php $this->commentsNum(_t('0'), _t('1'), _t('%d')); ?></span><?php if(!$this->allow('comment')): ?><span class="comments-count">已关闭评论</span><?php endif; ?>
                                <?php if($this->user->hasLogin()): ?>
                                 <a href="<?php $this->options->profileUrl(); ?>"><img src="<?php Gravatar($this->user->mail); ?>s=100" alt="" class="img-svg" style="margin-bottom:-10px;border-radius:50px;width:50px;height:50px"></a>
                               <?php endif; ?>
                                </h2>
                                    <?php if($this->allow('comment')): ?>
                                 <div  id="<?php $this->respondId(); ?>" class="respond"><div class="cancel-comment-reply" >
        
            <?php $comments->cancelReply('<span class="login-link" style="margin-left:10px;margin-top:8px;margin-bottom:30px">
  取消回复
</span>'); ?>
        </div>
        <?php if($this->user->hasLogin()): ?>

                                               
                          
         <form method="post" action="<?php $this->commentUrl() ?>" id="comment-form" role="form" >
          
                                <div class="comments-form">
                                    <div class="input-wrap textarea-wrap white-label comment-field" style="margin-bottom:15px">
                                        <textarea name="text" id="textarea" class="input textarea" placeholder="撰写评论" required><?php $this->remember('text'); ?></textarea>
                                    </div>
                                      
                                    <button type="submit" class="btn submit submit-btn">
                                        <span>提交评论</span>
                                    </button>
                                </div>
                                </form>
        <?php else: ?>
                                <form method="post" action="<?php $this->commentUrl() ?>" id="comment-form" role="form" >
          
                                <div class="comments-form">
                                    <div class="input-wrap textarea-wrap white-label comment-field" style="margin-bottom:15px">
                                        <textarea name="text" id="textarea" class="input textarea" placeholder="撰写评论" required><?php $this->remember('text'); ?></textarea>
                                    </div>
                                    <div class="input-wrap white-label name-field" style="margin-bottom:15px">
                                        <input type="text" name="author" id="author" class="input"  placeholder="称呼*" value="<?php $this->remember('author'); ?>" required />
                                    </div>
                                    <div class="input-wrap white-label email-field" style="margin-bottom:15px">
                                        <input type="email" name="mail" id="mail" class="input" placeholder="邮箱*" value="<?php $this->remember('mail'); ?>" required />
                                    </div>
                                    
                                    <button type="submit" class="btn submit submit-btn">
                                        <span>提交评论</span>
                                    </button>
                                </div>
                                </form>
                                <?php endif; ?>
                                </div>
                                
                               
                                 <div class="comments-list"> 
                             

    <?php else: ?>
</div>
    <?php endif; ?>
 <div class="comments-list"> 
                                    <div class="comments-lists">
                               <?php $comments->listComments(); ?> 
                            </div>
                         </div>
                                                   <?php
      ob_start(); 
      $comments->pageNav('&laquo;','&raquo;', 1, '');
      $content = ob_get_contents();
      ob_end_clean();
      $content = preg_replace("/<ol class=\"(.*?)\">/sm", '<div class="pagination"><div class="pagination-links">', $content);
      $content = preg_replace("/<li><span>(.*?)<\/span><\/li>/sm", '<span class="pag-link extend">...</span>', $content);
            $content = preg_replace("/<li [class=\"current\"]+><a href=\"111\">(.*?)<\/a><\/li>/sm", '<li class="page-item active">$1</li>', $content);
      $content = preg_replace("/<li class=\"current\"><a href=\"(.*?)\">(.*?)<\/a><\/li>/sm", '<a href="$1" class="pag-link current">$2</a>', $content);
      $content = preg_replace("/<li><a href=\"(.*?)\">(.*?)<\/a><\/li>/sm", '<a href="$1" class="pag-link">$2</a>', $content);
       $content = preg_replace("/<li [class=\"prev\"]+><a href=\"(.*?)\">(.*?)<\/a><\/li>/sm", '<a href="$1" class="pag-link">$2</a>', $content);
      $content = preg_replace("/<li [class=\"next\"]+><a href=\"(.*?)\">(.*?)<\/a><\/li>/sm", '<a href="$1" class="pag-link">$2</a>', $content);
      $content = preg_replace("/<\/ol>/sm", '</div></div>', $content);
      echo $content;

     ?>
                        </div>

                    </div>
                </div>
            </div>
