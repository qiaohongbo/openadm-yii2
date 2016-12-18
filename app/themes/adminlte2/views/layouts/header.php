<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>
<?php if(!Yii::$app->user->isGuest):?>
    <header class="main-header">

        <!-- Logo -->
        <a href="/dashboard" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>A</b>LT</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b><?= Html::encode(Yii::$app->name) ?></b></span>
        </a>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
                            <span class="hidden-xs">Alexander Pierce</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- Menu Footer-->
                            <li><a href="<?=Url::to('/user/profile')?>"><i class="fa fa-user"></i> 个人资料</a></li>
                            <li><a href="<?=Url::to('/user/account')?>"><i class="fa fa-user"></i> 修改密码</a></li>
                            <li><a href="<?=Url::to('/user/logout')?>"><i class="fa fa-off"></i> 退出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>
    </header>
<?php endif;?>