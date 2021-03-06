# 旧

## 实体

### 班级
- 班级代码
- 班级名
- 学委学号

### 学生
- 学号
- 密码
- 所在班级

### 课代表
- 学号
- 职位，科目
- 所在班级

### 作业
- 发起人(课代表)
- 作业名字
- 文件名格式
- 文件大小限制
- 截止日期

### 管理员
- 账号
- 密码

## 业务
- 创建班级(管理员)
- 修改班级信息(管理员)
- 删除班级(管理员)
- 添加课代表(学委)
- 删除课代表(学委)
- 布置作业(课代表)
- 下载大家交的作业(课代表)
- 加入班级(学生)
- 交作业(学生)
- 查看已提交(学生)

## 页面内容
- 登录，注册页面
- 主页
  - 右上角个人信息
    - 学号，姓名
    - 班级代码(加入班级，退出班级)
    - (课代表职位)
  - 页面中间显示当前可提交的作业
    - 每个作业显示截至时间，所属科目，名称
    - 如果没有作业就页面中间就显示当前没作业
	- 点击作业跳转到对应作业提交页面(老版本的那个提交页面)中
    - 课代表点击自己布置的作业进入下载大家作业的页面
	- 如果还没加入班级显示当前未加入班级
  - 页面某处添加作业的按钮(课代表可见)
    - 点击后弹出作业信息的表单
      - 设置作业名称
      - 设置截至时间
      - 设置文件提交格式(插入提供的变量，如：学号，姓名)
      - 确定，取消按钮
- 作业提交页面
  - 页面Title和顶部加一个当前正在交的作业的名称
- 课代表下载作业页面
  - 中间已提交的列表，每个作业有一个下载按钮和一个复选框按钮
  - 页面某处批量下载按钮
- 学委页面(目前我自己用，能用就行，可以先不着急设计)
  - 将学生添加到班级中
  - 设置课代表
  - 移除学生

# 新

## 实体

### 管理员
- 账号
- 密码

### 学生
- 学号
- 密码
- 所在班级列表

### 班级
- 班级号
- 班级名
- 课代表学号 -> 学生(学号)

### 作业
- 作业名字
- 文件名格式
- 文件大小限制
- 截止日期
- 所在班级号 -> 班级(班级号)

## 关系模式
角色(**角色ID**, 角色名称)
用户(**账号**, 密码, 用户名)
班级(**班级号**, 班级名, *课代表账号*)
作业(**作业ID**, 作业名字, 格式, 大小限制, ddl, *班级号*)
学生作业(**学生作业ID**, 是否提交, 相关存放路径, *学生账号*, *作业ID*)
学生班级表(*班级号*, *学生账号*)

## 业务
- 创建班级(管理员，课代表可申请)
- 修改班级信息(课代表)
- 删除班级(管理员，课代表可申请)
- 添加学生(课代表)
- 移除学生(课代表)
- 布置作业(课代表)
- 下载大家交的作业(课代表)
- 交作业(学生)
- 查看已提交(学生)

## 页面内容
- 登录，注册页面
- 主页
  - 右上角个人信息
    - 学号，姓名
  - 页面头部下面有一个tab栏(作业，课程)	
    - 作业：页面中间显示当前所有科目的作业(所属科目，作业名，ddl，提交人数)，点击作业跳转到作业提交页面
	- 课程：显示所有课程(课程名，课代表名)，点击课程跳转到课程页面
- 课程页面
  - 页面上方显示课程名和课代表名
  - 页面中部
    - 左侧显示作业
      - 列表右上角有编辑作业控件(课代表可见)
    - 右侧显示成员列表
      - 成员列表下方有编辑成员控件(课代表可见)
- 作业提交页面
  - 页面Title和顶部加一个当前正在交的作业的名称
- 课代表下载作业页面(课代表点击作业跳转到此页面)
  - 中间已提交的列表，每个作业有一个下载按钮和一个复选框按钮
  - 页面某处批量下载按钮

## 接口

- 登录
  - req:
    - 账号
    - 密码
  - res:
    - result:
      - flag:是否成功
	  - 状态码
	  - 描述信息
	  - 令牌
- 修改密码(POST | /user/changePd)
  - req:
	- 令牌(请求头)(String)
    - 账号(account)(String)
	- 原密码(oldPd)(String)
    - 新密码(newPd)(String)
  - res:
    - 是否成功(flag)(Bool)
    - 描述信息(message)(String)
- 获取用户信息(/user/info)
  - req:
    - 令牌(请求头)(String)
	- 账号(account)(String)
  - res:
    - user:
      - 用户名(username)(String)
    - 是否成功(flag)(Bool)
    - 描述信息(message)(String)
- 获取某个学生的所有作业(/getStudentAllWork)
  - req:
    - 令牌(请求头)(String)
    - 账号(account)(String)
  - res:
    - list(work):(workList)(list)
      - 课程名(courseName)(String)
	  - 作业号(workId)(String/Number)
	  - 作业名(workName)(String)
	  - 截止时间(deadline)(long相对于1970年的那个毫秒值)
	  - 提交人数(submitNumber)(Number)
	  - 当前用户是否提交(submitted)(Bool)
- 获取某个学生的所有课程(/getStudentAllCourse)
  - req:
    - 令牌(请求头)(String)
    - 账号(account)(String)
  - res:
    - list(course):(courseList)(list)
      - 课程号(courseId)(String)
      - 课程名(courseName)(String)
      - 课代表名(managerName)(String)
- 获取作业信息
  - req:
    - 令牌(请求头)
    - 作业号
	- 用户账号
  - res:
    - 作业名
    - 课程名
	- 用户是否可提交该作业
- 获取某个作业已提交名单
  - req:
    - 令牌(请求头)
    - 作业号
  - res:
    - list(user):
      - 账号
      - 用户名
- 获取课程信息
  - req:
    - 令牌(请求头)
    - 课程号
	- 用户账号
  - res:
    - 用户是否参与了这个课程
    - 课程名
	- 课代表账号
    - 课代表名
- 获取某个课程中的作业
  - req:
    - 令牌(请求头)
    - 课程号
  - res:
    - list(work):
      - 课程名
	  - 作业号
	  - 作业名
	  - 截止时间
	  - 提交人数
	  - 当前用户是否提交
- 获取某个课程中的成员名单
  - req:
    - 令牌(请求头)
    - 课程号 
  - res:
    - list(user):
      - 账号
      - 用户名
- 添加课程成员
  - req:
    - 令牌(请求头)
    - 课程号
    - list(用户账号)
  - res:
    - 是否成功
- 删除课程成员
  - req:
    - 令牌(请求头)
    - 课程号 
	- list(用户账号)
  - res:
    - 是否成功
- 添加作业
  - req:
    - 令牌(请求头)
    - 课程号
    - 作业名
    - 文件名格式
	- 截止日期
  - res:
    - 作业号
- 修改作业信息
  - req:
    - 令牌(请求头)
    - 作业号
    - 作业名
	- 截止日期
  - res:
    - 是否成功
- 删除作业
  - req:
    - 令牌(请求头)
	- 作业号
  - res:
    - 是否成功
- 查看已提交作业
  - req:
	- 令牌(请求头)
    - 作业号
  - res:
    - list(file):
      - 文件号
      - 文件名
      - 提交者账号
      - 提交者用户名
- 下载作业
  - req:
    - 令牌(请求头)
    - list(文件号)
  - res:
    - list(文件路径)
- 提交作业
  - req:
    - 令牌(请求头)
    - 作业号
    - 账号
    - 用户名
    - 文件
  - res:
    - 是否成功
