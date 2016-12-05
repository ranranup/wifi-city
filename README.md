# wifi-city
### - 所有的外部引入的文件，包括 js、css、fonts、icon 等都放在了lib目录下    
### - HTML页面的含义如下：  
  1. login 登陆界面  
  2. index 主界面  
  3. area-AP 主页面的二级页面，用来展示某商场的 AP 对比情况   
  4. detail 主页面的三级页面，用来展示AP详情  
  5. mac-track 设备轨迹界面  
  6. people-track 人流轨迹界面  
  7. all-rank AP总排行榜界面   
  8. quarter-rank AP季度排行榜界面  
  9. month-rank AP月排行榜界面  
  10. AP-manage AP管理界面  
  11. user-manage 用户管理界面  


  ## 安装方式：
  下载安装node：
  https://npm.taobao.org/mirrors/node/latest-v6.x/node-v6.9.1-x64.msi

  安装目录随意

  ## 开发时，不用自动刷新：
  进入项目目录，打开cmd执行命令：
  ```
  npm run dev
  ```
  运行结果如下；
  ```
  > cross-env NODE_ENV=development node index

  ▀ ╢░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  serve static files in src
  proxy to :::http://10.82.82.119:81
  [HPM] Proxy created: /  ->  http://10.82.82.119:81
  server start at: 8090
  ```

  ## 开发时，自动刷新：
  进入项目目录，打开cmd执行命令：
  ```
  npm run dev:hot
  ```
  运行结果如下；
  ```
  > gulp hot

  ▀ ╢░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  [15:23:31] Using gulpfile I:\apm\front\gulpfile.js
  [15:23:31] Starting 'hot'...
  [HPM] Proxy created: /api  ->  http://10.82.82.119:81
  [15:23:31] Finished 'hot' after 64 ms
  [BS] Access URLs:
   --------------------------------------
         Local: http://localhost:8090
      External: http://192.168.1.184:8090
   --------------------------------------
            UI: http://localhost:3001
   UI External: http://192.168.1.184:3001
  ```

  ## 最终项目部署，执行命令：
  ```
  npm run server
  ```
