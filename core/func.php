<?php
include_once('version.php');
include_once('general.php');
include_once('commentsec.php');
include_once('shortcode.php');
include_once('editor.php');

/**
 * 文章自定义字段
 */

function themeFields(Typecho_Widget_Helper_Layout $layout)
{
    $cover = new Typecho_Widget_Helper_Form_Element_Text('cover', null, null, '文章封面', '输入文章封面图片直链');
    $layout->addItem($cover);
}

/* 主题初始化 */
function themeInit($self)
{
    Helper::options()->commentsRequireMail = true;
    Helper::options()->commentsRequireURL = false;
    Helper::options()->commentsThreaded = true;
    Helper::options()->commentsMaxNestingLevels = 999;
}