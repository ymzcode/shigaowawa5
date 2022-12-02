# uni-app云开发的小程序

适用于图片展览型社区，因uni-app阿里云开发不再免费，小程序上架遇到社区/论坛资质问题，程序未能成功发布，遂进行开源。

第一次接触云开发，也算是练手项目

# 实现功能

1. 微信小程序的注册、登录、个人中心
2. 游客可以游览首页数据及内容，但不可评论和收藏
3. 文章内容可以同级评论，文章内容可以收藏
4. 评论内容通过[文本内容安全识别](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html)同步审核
5. 用户可自行发布作品，通过[音视频内容安全识别](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/mediaCheckAsync.html)异步进行自动审核，不通过自动删除云存储的图片
6. 用户可以对自己的作品进行分享和删除，不能修改
7. 首页hello使用了lottie动画，其他地方优化为GIF



# 视频完整演示

https://www.bilibili.com/video/BV1T24y1k7wo/?vd_source=38c67fbe46c91bd0abcb32a565b6d4f1

