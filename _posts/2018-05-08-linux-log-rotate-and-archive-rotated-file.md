---
layout: post
title: Linux Log Rotate and archive rotated file.
date: 2018-05-08 16:54:37.000000000 +05:30
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
excerpt: How to log rotate and upload files Azure blob
tag:
- logrotate
- tar
- Azure
- Blob
meta:
  timeline_notification: '1525798482'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '17626891689'
  _publicize_done_external: a:2:{s:8:"facebook";a:1:{i:1959598;s:38:"https://facebook.com/10211757460713471";}s:7:"twitter";a:1:{i:12858665;s:56:"https://twitter.com/ajo_mathew/status/993896998595170306";}}
  _publicize_done_2350357: '1'
  _wpas_done_1959598: '1'
  _publicize_done_12865681: '1'
  _wpas_done_12858665: '1'
  publicize_twitter_user: ajo_mathew
author: ajo_mathew
permalink: "/2018/05/08/linux-log-rotate-and-archive-rotated-file/"
---
I was checking an article on how to upload archived logs to azure blob.
As initial set up I've updated logrotate.conf(`/etc/logrotate.conf`) with below settings.

#### file to edit:

`/etc/logrotate.conf`

{% gist 5d2a8a1bf8cb0f619b45a39785dee395 %}

Then updated syslog rotate config to test on how messages files can be archived. Make sure the destination path is created. In this case I've got `/opt/logs/` referenced.
*file edited* 
`/opt/logrotate.d/syslog`

{% gist bacb68f7f66e346d1d80f2a934c00856 %}

This will ensure the last rotated log file would be copied to /opt/logs/. You can have any other scripts configured to upload to blob from here.
Once these settings are in place test run(force run) _logrotate -f /etc/logrotate.conf_.
Result of the operation can be found below

```bash
view Current Dir # pwd
/opt/logs
view files in current directory ll
total 0
Force run logrotate # logrotate -f /etc/logrotate.conf 
tar: Removing leading `/' from member names
/var/log/messages-2018-05-08-1525798193 -- Note the time stamp
View files in /opt/logs/ # ll
total 4
-rw-r--r--. 1 root root 257 May 8 16:56 messages-2018-05-08-16-56.tar.gz
View the file next to be rotated # ll /var/log/|grep messages-
-rw-------. 1 root root 147 May 8 16:49 messages-2018-05-08-1525798616
```

Test Results :)

If you are able to follow the bash commands you can see the archived file has the same timestamp as first created log.

```bash 
[root@localhost logs]# cat /var/log/messages-2018-05-08-1525799265
May 8 17:05:18 localhost rsyslogd: [origin software="rsyslogd" swVersion="8.24.0" x-pid="553" x-info="http://www.rsyslog.com"] rsyslogd was HUPed
May 8 17:05:31 localhost chronyd[561]: Selected source 123.108.200.124
May 8 17:06:36 localhost su: (to root) vagrant on pts/0
May 8 17:07:40 localhost chronyd[561]: Selected source 139.59.43.68
[root@localhost logs]# logrotate -f /etc/logrotate.conf
tar: Removing leading `/' from member names
/var/log/messages-2018-05-08-1525799265
[root@localhost logs]# ll
total 4
-rw-r--r--. 1 root root 342 May 8 17:08 messages-2018-05-08-17-08.tar.gz
[root@localhost logs]# tar -zxvf *.tar.gz
var/log/messages-2018-05-08-1525799265
[root@localhost logs]# cat var/log/messages-2018-05-08-1525799265
May 8 17:05:18 localhost rsyslogd: [origin software="rsyslogd" swVersion="8.24.0" x-pid="553" x-info="http://www.rsyslog.com"] rsyslogd was HUPed
May 8 17:05:31 localhost chronyd[561]: Selected source 123.108.200.124
May 8 17:06:36 localhost su: (to root) vagrant on pts/0
May 8 17:07:40 localhost chronyd[561]: Selected source 139.59.43.68
```

If you want to implement logrotate to blog storage, the reference URL is [dowdandassociates.com/blog/](http://www.dowdandassociates.com/blog/content/howto-rotate-logs-to-s3) .
Above link is about logrotate to S3 hourly using `s3cmd`. I would be using `azcopy` for blob storage upload.
