## EWS系统维护手册

### 项目介绍
    项目基于uhttpd 搭建的嵌入式WEB软件系统，前端基于js、html语言，使用vue框架，
    后台基于lua 语言。整体以Restful API 形式交互。
### 环境设置
    lua运行在uhttpd的www/cgi-bin目录下，页面存放于www的根目录下。
### 脚本分类
    文件分为三类:
    1. 以基础的字符串、http解析为主的lua脚本.
    2. 以调用常量为主的脚本.
    3. 以对外提供接口为主的lua脚本.
### 维护简介

    vue html代码在代码层有统一注释。
    src/common/lang/cn.js 为中文展示
    src/common/lang/en.js 为英文展示
    文件中，左边为key，右边是需要展示的文字。
    
    接口和常量脚本统一不做统一介绍，
    接口皆以数据交互为主，从客户端读取数据，从服务端下发数据。
    常量类在代码层有注释。

| 脚本名称 | 类型 | 内容 |
| :------| ------: | :------: |
| constants.lua | 常量 | 主要包含文件名、与前端交互的字段名称 |
| data.lua | 基本类 | 封装JSON请求和JSON对象 |
| extends.lua | 基本类 | 重新封装string 函数，加入字符串分割函数 |
| file.lua | 基本类 | 对于文件的增删改查、和读取指定文件的属性值，返回标准字符串 |
| fileProcess.lua | 基本类 | 处理文件读写、返回文件对象 |
| get.lua | 基本类 | 处理服务器端get请求 |
| http.lua | 基本类 | 处理http中encode 和decode 问题 |
| invoke.lua | 基本类 | 常用的设备重启命令常量 |
| post.lua | 基本类 | 处理服务端post请求 |
| query_* | 接口类 | 处理对服务器端的查询操作，以get请求为主 |
| modify_* | 接口类 | 处理对服务器资源的修改操作 |
| remove_* | 接口类 | 处理对服务器资源的删除动作 |
| upload_* | 接口类 | 处理上传动作 |
| add_* | 接口类 | 处理新增动作 |

### 维护须知
    非专业人士请勿修改。
    专业人士在了解原有逻辑的情况下进行修改

### 维护者

    开发者：Blackey
    联系方式： ybs.blackey.gmail.com
    