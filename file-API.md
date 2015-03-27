---
layout: page
title: File API
---

Smartling's File API allows you to upload and retrieve files, display a list of recently uploaded files, and check the status of a translation’s progress. All URLs have the following base: https://api.smartling.com/v1

All the following calls require both the apiKey and projectID parameter, which you can find on at [**Project Settings>API**](https://dashboard.smartling.com/settings/api) in the Smartling Dashboard.

Multiple READ operations can run simultaneously on a single file, but only one WRITE operation can run at a time. Attempting any other operation on a file while a WRITE operation is running will result in an error.

Concurrent API requests are limited to 20 per file and 50 per project. Exceeding this limit will result in a MAX_OPERATIONS_LIMIT_EXCEEDED error.

####Methods

* upload (POST)
* download (GET)
* list (GET)
* status (GET)
* rename (POST)
* delete (DELETE)
* import (POST)
* last_modified (GET)
