@implementation MSDAppPrivacyPermissionsHelper

+ (id)sharedInstance
{
  void *v2;
  uint64_t vars8;

  if (qword_1001745C8 != -1)
    dispatch_once(&qword_1001745C8, &stru_10013D610);
  v2 = (void *)qword_1001745C0;
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  return objc_retainAutoreleaseReturnValue(v2);
}

- (MSDAppPrivacyPermissionsHelper)init
{
  MSDAppPrivacyPermissionsHelper *v2;
  MSDAppPrivacyPermissionsHelper *v3;
  void *v4;
  void *v5;
  void *v6;
  objc_super v8;

  v8.receiver = self;
  v8.super_class = (Class)&OBJC_CLASS___MSDAppPrivacyPermissionsHelper;
  v2 = -[MSDAppPrivacyPermissionsHelper init](&v8, "init");
  v3 = v2;
  if (v2)
  {
    -[MSDAppPrivacyPermissionsHelper getTccOwnedResources](v2, "getTccOwnedResources");
    v4 = (void *)objc_claimAutoreleasedReturnValue();
    -[MSDAppPrivacyPermissionsHelper setTccOwnedResources:](v3, "setTccOwnedResources:", v4);
    objc_release(v4);
    -[MSDAppPrivacyPermissionsHelper getCoreLocationOwnedResources](v3, "getCoreLocationOwnedResources");
    v5 = (void *)objc_claimAutoreleasedReturnValue();
    -[MSDAppPrivacyPermissionsHelper setCoreLocationOwnedResources:](v3, "setCoreLocationOwnedResources:", v5);
    objc_release(v5);
    -[MSDAppPrivacyPermissionsHelper getNetworkOwnedResources](v3, "getNetworkOwnedResources");
    v6 = (void *)objc_claimAutoreleasedReturnValue();
    -[MSDAppPrivacyPermissionsHelper setNetworkOwnedResources:](v3, "setNetworkOwnedResources:", v6);
    objc_release(v6);
  }
  return v3;
}

- (void)grantPrivacyPermissions:(id)a3 forAppBundleID:(id)a4 
{
  id v6;
  id v7;
  id v8;
  id v9;
  uint64_t v10;
  void *v11;
  uint64_t v12;
  NSObject *v13;
  void *v14;
  id v15;
  NSObject *v16;
  NSObject *v17;
  const char *v18;
  uint32_t v19;
  void *v20;
  id v21;
  id v22;
  __int128 v23;
  __int128 v24;
  __int128 v25;
  __int128 v26;
  uint8_t buf[4];
  const char *v28;
  __int16 v29;
  uint64_t v30;
  __int16 v31;
  id v32;
  __int16 v33;
  int v34;
  _BYTE v35[128];

  v6 = objc_retain(a3);
  v7 = objc_retain(a4);
  v23 = 0u;
  v24 = 0u;
  v25 = 0u;
  v26 = 0u;
  v8 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v23, v35, 16LL);
  if (v8)
  {
    v9 = v8;
    v10 = *(_QWORD *)v24;
    do
    {
      v11 = 0LL;
      do
      {
        if (*(_QWORD *)v24 != v10)
          objc_enumerationMutation(v6);
        v12 = *(_QWORD *)(*((_QWORD *)&v23 + 1) + 8LL * (_QWORD)v11);
        sub_100061BEC();
        v13 = (NSObject *)objc_claimAutoreleasedReturnValue();
        if (os_log_type_enabled(v13, OS_LOG_TYPE_DEFAULT))
        {
          *(_DWORD *)buf = 136315650;
          v28 = "-[MSDAppPrivacyPermissionsHelper grantPrivacyPermissions:forAppBundleID:]";
          v29 = 2114;
          v30 = v12;
          v31 = 2114;
          v32 = v7;
          _os_log_impl((void *)&_mh_execute_header, v13, OS_LOG_TYPE_DEFAULT, "%s - Granting privacy permission for resource: %{public}@ to app: %{public}@", buf, 0x20u);
        }
        objc_release(v13);
        if (-[MSDAppPrivacyPermissionsHelper isTccOwnedResource:](self, "isTccOwnedResource:", v12))
        {
          objc_msgSend(v6, "objectForKey:", v12);
          v14 = (void *)objc_claimAutoreleasedReturnValue();
          v15 = objc_msgSend(v14, "BOOLValue");
          objc_release(v14);
          if (-[MSDAppPrivacyPermissionsHelper grantTCCPermission:forResource:toBundleID:](self, "grantTCCPermission:forResource:toBundleID:", v15, v12, v7))
          {
            goto LABEL_21;
          }
          sub_100061BEC();
          v16 = (NSObject *)objc_claimAutoreleasedReturnValue();
          if (!os_log_type_enabled(v16, OS_LOG_TYPE_ERROR))
            goto LABEL_20;
          *(_DWORD *)buf = 136315906;
          v28 = "-[MSDAppPrivacyPermissionsHelper grantPrivacyPermissions:forAppBundleID:]";
          v29 = 2114;
          v30 = v12;
          v31 = 2114;
          v32 = v7;
          v33 = 1024;
          v34 = (int)v15;
          v17 = v16;
          v18 = "%s - Failed to grant TCC resource:  %{public}@ to bundle:  %{public}@ isGranted:  %{BOOL}d";
LABEL_12:
          v19 = 38;
LABEL_24:
          _os_log_error_impl((void *)&_mh_execute_header, v17, OS_LOG_TYPE_ERROR, v18, buf, v19);
          goto LABEL_20;
        }
        if (-[MSDAppPrivacyPermissionsHelper isCoreLocationOwnedResource:](self, "isCoreLocationOwnedResource:", v12))
        {
          objc_msgSend(v6, "objectForKey:", v12);
          v16 = (NSObject *)objc_claimAutoreleasedReturnValue();
          -[MSDAppPrivacyPermissionsHelper grantCLPermission:toBundleID:](self, "grantCLPermission:toBundleID:", v16, v7);
        }
        else if (-[MSDAppPrivacyPermissionsHelper isNetworkOwnedResource:](self, "isNetworkOwnedResource:", v12))
        {
          objc_msgSend(v6, "objectForKey:", v12);
          v20 = (void *)objc_claimAutoreleasedReturnValue();
          v21 = objc_msgSend(v20, "BOOLValue");
          objc_release(v20);
          if (-[MSDAppPrivacyPermissionsHelper grantNetworkPermission:toBundleID:](self, "grantNetworkPermission:toBundleID:", v21, v7))
          {
            goto LABEL_21;
          }
          sub_100061BEC();
          v16 = (NSObject *)objc_claimAutoreleasedReturnValue();
          if (os_log_type_enabled(v16, OS_LOG_TYPE_ERROR))
          {
            *(_DWORD *)buf = 136315906;
            v28 = "-[MSDAppPrivacyPermissionsHelper grantPrivacyPermissions:forAppBundleID:]";
            v29 = 2114;
            v30 = v12;
            v31 = 2114;
            v32 = v7;
            v33 = 1024;
            v34 = (int)v21;
            v17 = v16;
            v18 = "%s - Failed to grant network permission:  %{public}@ to bundle:  %{public}@ allow:  %{BOOL}d";
            goto LABEL_12;
          }
        }
        else
        {
          sub_100061BEC();
          v16 = (NSObject *)objc_claimAutoreleasedReturnValue();
          if (os_log_type_enabled(v16, OS_LOG_TYPE_ERROR))
          {
            *(_DWORD *)buf = 136315650;
            v28 = "-[MSDAppPrivacyPermissionsHelper grantPrivacyPermissions:forAppBundleID:]";
            v29 = 2114;
            v30 = v12;
            v31 = 2114;
            v32 = v7;
            v17 = v16;
            v18 = "%s - Unknown resource recorded in manifest:  %{public}@ for bundle:  %{public}@";
            v19 = 32;
            goto LABEL_24;
          }
        }
LABEL_20:
        objc_release(v16);
LABEL_21:
        v11 = (char *)v11 + 1;
      }
      while (v9 != v11);
      v22 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v23, v35, 16LL);
      v9 = v22;
    }
    while (v22);
  }
  objc_release(v7);
  objc_release(v6);
}

- (void)revokePrivacyPermissions:(id)a3 forAppBundleID:(id)a4 
{
  id v6;
  char *v7;
  id v8;
  id v9;
  uint64_t v10;
  void *v11;
  const char *v12;
  NSObject *v13;
  NSObject *v14;
  __int128 v15;
  __int128 v16;
  __int128 v17;
  __int128 v18;
  uint8_t buf[4];
  const char *v20;
  __int16 v21;
  const char *v22;
  __int16 v23;
  char *v24;
  _BYTE v25[128];

  v6 = objc_retain(a3);
  v7 = (char *)objc_retain(a4);
  v15 = 0u;
  v16 = 0u;
  v17 = 0u;
  v18 = 0u;
  v8 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v15, v25, 16LL);
  if (v8)
  {
    v9 = v8;
    v10 = *(_QWORD *)v16;
    do
    {
      v11 = 0LL;
      do
      {
        if (*(_QWORD *)v16 != v10)
          objc_enumerationMutation(v6);
        v12 = *(const char **)(*((_QWORD *)&v15 + 1) + 8LL * (_QWORD)v11);
        sub_100061BEC();
        v13 = (NSObject *)objc_claimAutoreleasedReturnValue();
        if (os_log_type_enabled(v13, OS_LOG_TYPE_DEFAULT))
        {
          *(_DWORD *)buf = 138543618;
          v20 = v12;
          v21 = 2114;
          v22 = v7;
          _os_log_impl((void *)&_mh_execute_header, v13, OS_LOG_TYPE_DEFAULT, "Revoking privacy permission for resource: %{public}@ to app: %{public}@", buf, 0x16u);
        }
        objc_release(v13);
        if (-[MSDAppPrivacyPermissionsHelper isTccOwnedResource:](self, "isTccOwnedResource:", v12))
        {
          -[MSDAppPrivacyPermissionsHelper revokeTCCPermissionForResource:toBundleID:](self, "revokeTCCPermissionForResource:toBundleID:", v12, v7);
        }
        else if (-[MSDAppPrivacyPermissionsHelper isCoreLocationOwnedResource:](self, "isCoreLocationOwnedResource:", v12))
        {
          -[MSDAppPrivacyPermissionsHelper revokeCLPermissionForBundleID:](self, "revokeCLPermissionForBundleID:", v7);
        }
        else if (-[MSDAppPrivacyPermissionsHelper isNetworkOwnedResource:](self, "isNetworkOwnedResource:", v12))
        {
          -[MSDAppPrivacyPermissionsHelper revokeNetworkPermissionForBundleID:](self, "revokeNetworkPermissionForBundleID:", v7);
        }
        else
        {
          sub_100061BEC();
          v14 = (NSObject *)objc_claimAutoreleasedReturnValue();
          if (os_log_type_enabled(v14, OS_LOG_TYPE_ERROR))
          {
            *(_DWORD *)buf = 136315650;
            v20 = "-[MSDAppPrivacyPermissionsHelper revokePrivacyPermissions:forAppBundleID:]";
            v21 = 2114;
            v22 = v12;
            v23 = 2114;
            v24 = v7;
            _os_log_error_impl((void *)&_mh_execute_header, v14, OS_LOG_TYPE_ERROR, "%s - Unknown resource recorded in manifest:  %{public}@ for bundle:  %{public}@", buf, 0x20u);
          }
          objc_release(v14);
        }
        v11 = (char *)v11 + 1;
      }
      while (v9 != v11);
      v9 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v15, v25, 16LL);
    }
    while (v9);
  }
  objc_release(v7);
  objc_release(v6);
}

- (id)getPrivacyPermissionsForAppBundleID:(id)a3 
{
  id v4;
  id v5;
  void *v6;
  void *v7;
  void *v8;
  uint64_t vars8;

  v4 = objc_retain(a3);
  v5 = objc_alloc_init((Class)&OBJC_CLASS___NSMutableDictionary);
  -[MSDAppPrivacyPermissionsHelper getTCCPermissionsForBundleID:](self, "getTCCPermissionsForBundleID:", v4);
  v6 = (void *)objc_claimAutoreleasedReturnValue();
  if (v6)
    objc_msgSend(v5, "addEntriesFromDictionary:", v6);
  -[MSDAppPrivacyPermissionsHelper getCLPermissionForBundleID:](self, "getCLPermissionForBundleID:", v4);
  v7 = (void *)objc_claimAutoreleasedReturnValue();
  if (v7)
    objc_msgSend(v5, "addEntriesFromDictionary:", v7);
  -[MSDAppPrivacyPermissionsHelper getNetworkAccessPermissionForBundleID:](self, "getNetworkAccessPermissionForBundleID:", v4);
  v8 = (void *)objc_claimAutoreleasedReturnValue();
  if (v8)
    objc_msgSend(v5, "addEntriesFromDictionary:", v8);
  objc_release(v8);
  objc_release(v7);
  objc_release(v6);
  objc_release(v4);
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  return objc_autoreleaseReturnValue(v5);
}

- (id)getTccOwnedResources
{
  return +[NSSet setWithObjects:](&OBJC_CLASS___NSSet, "setWithObjects:", CFSTR("kTCCServiceAddressBook"), CFSTR("kTCCServiceCalendar"), CFSTR("kTCCServiceMediaLibrary"), CFSTR("kTCCServicePhotos"), CFSTR("kTCCServicePhotosAdd"), CFSTR("kTCCServiceReminders"), CFSTR("kTCCServiceBluetoothAlways"), CFSTR("kTCCServiceBluetoothPeripheral"), CFSTR("kTCCServiceMotion"), CFSTR("kTCCServiceLiverpool"), CFSTR("kTCCServiceUbiquity"), 0LL);
}

- (id)getCoreLocationOwnedResources
{
  return +[NSSet setWithObjects:](&OBJC_CLASS___NSSet, "setWithObjects:", CFSTR("kCLServiceLocationService"), 0LL);
}

- (id)getNetworkOwnedResources
{
  return +[NSSet setWithObjects:](&OBJC_CLASS___NSSet, "setWithObjects:", CFSTR("kNetworkServiceNetworkAccess"), 0LL);
}

- (BOOL)grantTCCPermission:(BOOL)a3 forResource:(id)a4 toBundleID:(id)a5 
{
  _BOOL4 v6;
  id v7;
  id v8;
  NSObject *v9;
  int v10;
  NSObject *v12;
  int v13;
  const char *v14;
  __int16 v15;
  _BOOL4 v16;
  __int16 v17;
  id v18;
  __int16 v19;
  id v20;

  v6 = a3;
  v7 = objc_retain(a4);
  v8 = objc_retain(a5);
  sub_100061BEC();
  v9 = (NSObject *)objc_claimAutoreleasedReturnValue();
  if (os_log_type_enabled(v9, OS_LOG_TYPE_DEFAULT))
  {
    v13 = 136315906;
    v14 = "-[MSDAppPrivacyPermissionsHelper grantTCCPermission:forResource:toBundleID:]";
    v15 = 1024;
    v16 = v6;
    v17 = 2114;
    v18 = v7;
    v19 = 2114;
    v20 = v8;
    _os_log_impl((void *)&_mh_execute_header, v9, OS_LOG_TYPE_DEFAULT, "%s - isGranted:  %{BOOL}d - resources:  %{public}@ - bundleID:  %{public}@", (uint8_t *)&v13, 0x26u);
  }
  objc_release(v9);
  v10 = TCCAccessSetForBundleId();
  if (!v10)
  {
    sub_100061BEC();
    v12 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v12, OS_LOG_TYPE_ERROR))
      sub_1000BD4E4((uint64_t)v7, (uint64_t)v8, v12);
    objc_release(v12);
  }
  objc_release(v8);
  objc_release(v7);
  return v10 != 0;
}

- (void)grantCLPermission:(id)a3 toBundleID:(id)a4 
{
  id v5;
  id v6;
  NSObject *v7;
  int v8;
  const char *v9;
  __int16 v10;
  unsigned int v11;
  __int16 v12;
  id v13;

  v5 = objc_retain(a3);
  v6 = objc_retain(a4);
  sub_100061BEC();
  v7 = (NSObject *)objc_claimAutoreleasedReturnValue();
  if (os_log_type_enabled(v7, OS_LOG_TYPE_DEFAULT))
  {
    v8 = 136315650;
    v9 = "-[MSDAppPrivacyPermissionsHelper grantCLPermission:toBundleID:]";
    v10 = 1024;
    v11 = (unsigned int)objc_msgSend(v5, "BOOLValue");
    v12 = 2114;
    v13 = v6;
    _os_log_impl((void *)&_mh_execute_header, v7, OS_LOG_TYPE_DEFAULT, "%s - status:  %{BOOL}d - bundleID:  %{public}@", (uint8_t *)&v8, 0x1Cu);
  }
  objc_release(v7);
  +[CLLocationManager setAuthorizationStatusByType:forBundleIdentifier:](&OBJC_CLASS___CLLocationManager, "setAuthorizationStatusByType:forBundleIdentifier:", objc_msgSend(v5, "integerValue"), v6);
  objc_release(v6);
  objc_release(v5);
}

- (BOOL)grantNetworkPermission:(BOOL)a3 toBundleID:(id)a4 
{
  _BOOL4 v4;
  id v6;
  NSObject *v7;
  void *v8;
  void *v9;
  void *v10;
  void *v11;
  id v12;
  id v13;
  uint64_t v14;
  uint64_t v15;
  void *v16;
  void *v17;
  unsigned int v18;
  NSObject *v19;
  BOOL v20;
  uint64_t v22;
  uint64_t v23;
  uint64_t v24;
  uint64_t v25;
  uint64_t v26;
  uint64_t v27;
  uint64_t v28;
  _BOOL4 v29;
  MSDAppPrivacyPermissionsHelper *v30;
  __int128 v31;
  __int128 v32;
  __int128 v33;
  __int128 v34;
  uint8_t v35[128];
  uint8_t buf[4];
  const char *v37;
  __int16 v38;
  _BOOL4 v39;
  __int16 v40;
  id v41;

  v4 = a3;
  v6 = objc_retain(a4);
  sub_100061BEC();
  v7 = (NSObject *)objc_claimAutoreleasedReturnValue();
  if (os_log_type_enabled(v7, OS_LOG_TYPE_DEFAULT))
  {
    *(_DWORD *)buf = 136315650;
    v37 = "-[MSDAppPrivacyPermissionsHelper grantNetworkPermission:toBundleID:]";
    v38 = 1024;
    v39 = v4;
    v40 = 2114;
    v41 = v6;
    _os_log_impl((void *)&_mh_execute_header, v7, OS_LOG_TYPE_DEFAULT, "%s - allow:  %{BOOL}d - bundleID:  %{public}@", buf, 0x1Cu);
  }
  objc_release(v7);
  -[MSDAppPrivacyPermissionsHelper getNetworkPrivacyConfiguration](self, "getNetworkPrivacyConfiguration");
  v8 = (void *)objc_claimAutoreleasedReturnValue();
  v9 = v8;
  if (!v8)
  {
    sub_100061BEC();
    v19 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v19, OS_LOG_TYPE_ERROR))
      sub_1000BD56C(v19, v22, v23, v24, v25, v26, v27, v28);
    v10 = 0LL;
LABEL_14:
    objc_release(v19);
LABEL_15:
    v20 = 0;
    goto LABEL_17;
  }
  v29 = v4;
  v30 = self;
  objc_msgSend(v8, "pathController");
  v10 = (void *)objc_claimAutoreleasedReturnValue();
  v31 = 0u;
  v32 = 0u;
  v33 = 0u;
  v34 = 0u;
  objc_msgSend(v10, "pathRules");
  v11 = (void *)objc_claimAutoreleasedReturnValue();
  v12 = objc_msgSend(v11, "countByEnumeratingWithState:objects:count:", &v31, v35, 16LL);
  if (!v12)
  {
LABEL_12:
    objc_release(v11);
    sub_100061BEC();
    v19 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v19, OS_LOG_TYPE_ERROR))
      sub_1000BD5A4(v19);
    goto LABEL_14;
  }
  v13 = v12;
  v14 = *(_QWORD *)v32;
LABEL_6:
  v15 = 0LL;
  while (1)
  {
    if (*(_QWORD *)v32 != v14)
      objc_enumerationMutation(v11);
    v16 = *(void **)(*((_QWORD *)&v31 + 1) + 8 * v15);
    objc_msgSend(v16, "matchSigningIdentifier");
    v17 = (void *)objc_claimAutoreleasedReturnValue();
    v18 = (unsigned int)objc_msgSend(v17, "isEqualToString:", v6);
    objc_release(v17);
    if (v18)
      break;
    if (v13 == (id)++v15)
    {
      v13 = objc_msgSend(v11, "countByEnumeratingWithState:objects:count:", &v31, v35, 16LL);
      if (v13)
        goto LABEL_6;
      goto LABEL_12;
    }
  }
  objc_msgSend(v16, "setDenyMulticast:", !v29);
  v20 = 1;
  objc_msgSend(v16, "setMulticastPreferenceSet:", 1LL);
  objc_release(v11);
  if (!-[MSDAppPrivacyPermissionsHelper saveNetworkPrivacyConfiguration:](v30, "saveNetworkPrivacyConfiguration:", v9))
    goto LABEL_15;
LABEL_17:
  objc_release(v9);
  objc_release(v10);
  objc_release(v6);
  return v20;
}

- (id)getTCCPermissionsForBundleID:(id)a3 
{
  id v3;
  id v4;
  char *v5;
  NSObject *v6;
  char *v7;
  id v8;
  id v9;
  uint64_t v10;
  void *i;
  void *v12;
  void *v13;
  void *v14;
  NSObject *v15;
  unsigned int v16;
  void *v17;
  void *v19;
  __int128 v20;
  __int128 v21;
  __int128 v22;
  __int128 v23;
  uint8_t buf[4];
  const char *v25;
  __int16 v26;
  void *v27;
  __int16 v28;
  unsigned int v29;
  _BYTE v30[128];
  uint64_t vars8;

  v3 = objc_retain(a3);
  v4 = objc_alloc_init((Class)&OBJC_CLASS___NSMutableDictionary);
  v19 = v3;
  v5 = (char *)TCCAccessCopyInformationForBundleId();
  sub_100061BEC();
  v6 = (NSObject *)objc_claimAutoreleasedReturnValue();
  if (os_log_type_enabled(v6, OS_LOG_TYPE_DEFAULT))
  {
    *(_DWORD *)buf = 138543362;
    v25 = v5;
    _os_log_impl((void *)&_mh_execute_header, v6, OS_LOG_TYPE_DEFAULT, "TCC info list: %{public}@", buf, 0xCu);
  }
  objc_release(v6);
  v22 = 0u;
  v23 = 0u;
  v20 = 0u;
  v21 = 0u;
  v7 = objc_retain(v5);
  v8 = objc_msgSend(v7, "countByEnumeratingWithState:objects:count:", &v20, v30, 16LL);
  if (v8)
  {
    v9 = v8;
    v10 = *(_QWORD *)v21;
    do
    {
      for (i = 0LL; i != v9; i = (char *)i + 1)
      {
        if (*(_QWORD *)v21 != v10)
          objc_enumerationMutation(v7);
        v12 = *(void **)(*((_QWORD *)&v20 + 1) + 8LL * (_QWORD)i);
        objc_msgSend(v12, "objectForKey:", kTCCInfoService);
        v13 = (void *)objc_claimAutoreleasedReturnValue();
        objc_msgSend(v12, "objectForKey:", kTCCInfoGranted);
        v14 = (void *)objc_claimAutoreleasedReturnValue();
        objc_msgSend(v4, "setObject:forKey:", v14, v13);
        sub_100061BEC();
        v15 = (NSObject *)objc_claimAutoreleasedReturnValue();
        if (os_log_type_enabled(v15, OS_LOG_TYPE_DEBUG))
        {
          v16 = (unsigned int)objc_msgSend(v14, "BOOLValue");
          *(_DWORD *)buf = 136315650;
          v25 = "-[MSDAppPrivacyPermissionsHelper getTCCPermissionsForBundleID:]";
          v26 = 2114;
          v27 = v13;
          v28 = 1024;
          v29 = v16;
          _os_log_debug_impl((void *)&_mh_execute_header, v15, OS_LOG_TYPE_DEBUG, "%s - resource:  %{public}@ - isGranted:  %{BOOL}d", buf, 0x1Cu);
        }
        objc_release(v15);
        objc_release(v14);
        objc_release(v13);
      }
      v9 = objc_msgSend(v7, "countByEnumeratingWithState:objects:count:", &v20, v30, 16LL);
    }
    while (v9);
  }
  objc_release(v7);
  +[NSDictionary dictionaryWithDictionary:](&OBJC_CLASS___NSDictionary, "dictionaryWithDictionary:", v4);
  v17 = (void *)objc_claimAutoreleasedReturnValue();
  objc_release(v7);
  objc_release(v4);
  objc_release(v19);
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  return objc_autoreleaseReturnValue(v17);
}

- (id)getCLPermissionForBundleID:(id)a3 
{
  signed int v3;
  id v4;
  void *v5;
  id v6;
  uint64_t vars8;

  v3 = (unsigned int)+[CLLocationManager authorizationStatusForBundleIdentifier:](&OBJC_CLASS___CLLocationManager, "authorizationStatusForBundleIdentifier:", a3);
  v4 = objc_alloc((Class)&OBJC_CLASS___NSDictionary);
  +[NSNumber numberWithInteger:](&OBJC_CLASS___NSNumber, "numberWithInteger:", v3);
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = objc_msgSend(v4, "initWithObjectsAndKeys:", v5, CFSTR("kCLServiceLocationService"), 0LL);
  objc_release(v5);
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  return objc_autoreleaseReturnValue(v6);
}

- (id)getNetworkAccessPermissionForBundleID:(id)a3 
{
  id v4;
  void *v5;
  void *v6;
  void *v7;
  NSObject *v8;
  id v9;
  id v10;
  uint64_t v11;
  void *i;
  void *v13;
  void *v14;
  unsigned int v15;
  id v16;
  NSObject *v17;
  unsigned int v18;
  id v19;
  void *v20;
  id v21;
  uint64_t v23;
  uint64_t v24;
  uint64_t v25;
  uint64_t v26;
  uint64_t v27;
  uint64_t v28;
  uint64_t v29;
  __int128 v30;
  __int128 v31;
  __int128 v32;
  __int128 v33;
  uint8_t buf[4];
  int v35;
  __int16 v36;
  id v37;
  _BYTE v38[128];

  v4 = objc_retain(a3);
  -[MSDAppPrivacyPermissionsHelper getNetworkPrivacyConfiguration](self, "getNetworkPrivacyConfiguration");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = v5;
  if (v5)
  {
    objc_msgSend(v5, "pathController");
    v7 = (void *)objc_claimAutoreleasedReturnValue();
    v30 = 0u;
    v31 = 0u;
    v32 = 0u;
    v33 = 0u;
    objc_msgSend(v7, "pathRules");
    v8 = (NSObject *)objc_claimAutoreleasedReturnValue();
    v9 = -[NSObject countByEnumeratingWithState:objects:count:](v8, "countByEnumeratingWithState:objects:count:", &v30, v38, 16LL);
    if (v9)
    {
      v10 = v9;
      v11 = *(_QWORD *)v31;
      while (2)
      {
        for (i = 0LL; i != v10; i = (char *)i + 1)
        {
          if (*(_QWORD *)v31 != v11)
            objc_enumerationMutation(v8);
          v13 = *(void **)(*((_QWORD *)&v30 + 1) + 8LL * (_QWORD)i);
          objc_msgSend(v13, "matchSigningIdentifier");
          v14 = (void *)objc_claimAutoreleasedReturnValue();
          v15 = (unsigned int)objc_msgSend(v14, "isEqualToString:", v4);
          objc_release(v14);
          if (v15)
          {
            sub_100061BEC();
            v17 = (NSObject *)objc_claimAutoreleasedReturnValue();
            if (os_log_type_enabled(v17, OS_LOG_TYPE_DEFAULT))
            {
              v18 = (unsigned int)objc_msgSend(v13, "denyMulticast");
              *(_DWORD *)buf = 67109378;
              v35 = v18 ^ 1;
              v36 = 2114;
              v37 = v4;
              _os_log_impl((void *)&_mh_execute_header, v17, OS_LOG_TYPE_DEFAULT, "Found network access permission: %d for bundleID: %{public}@", buf, 0x12u);
            }
            objc_release(v17);
            v19 = objc_alloc((Class)&OBJC_CLASS___NSDictionary);
            +[NSNumber numberWithBool:](&OBJC_CLASS___NSNumber, "numberWithBool:", (unsigned int)objc_msgSend(v13, "denyMulticast") ^ 1);
            v20 = (void *)objc_claimAutoreleasedReturnValue();
            v16 = objc_msgSend(v19, "initWithObjectsAndKeys:", v20, CFSTR("kNetworkServiceNetworkAccess"), 0LL);
            objc_release(v20);
            goto LABEL_14;
          }
        }
        v10 = -[NSObject countByEnumeratingWithState:objects:count:](v8, "countByEnumeratingWithState:objects:count:", &v30, v38, 16LL);
        if (v10)
          continue;
        break;
      }
    }
  }
  else
  {
    sub_100061BEC();
    v8 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v8, OS_LOG_TYPE_ERROR))
      sub_1000BD628(v8, v23, v24, v25, v26, v27, v28, v29);
    v7 = 0LL;
  }
  v16 = 0LL;
LABEL_14:
  objc_release(v8);
  v21 = objc_retainAutoreleaseReturnValue(v16);
  objc_release(v6);
  objc_release(v7);
  objc_release(v21);
  objc_release(v4);
  return v21;
}

- (void)revokeTCCPermissionForResource:(id)a3 toBundleID:(id)a4 
{
  _TCCAccessResetForBundleId(a3, a4);
}

- (void)revokeCLPermissionForBundleID:(id)a3 
{
  void *v4;
  id v5;
  uint64_t vars8;

  v5 = objc_retain(a3);
  if ((unsigned int)+[CLLocationManager authorizationStatusForBundleIdentifier:](&OBJC_CLASS___CLLocationManager, "authorizationStatusForBundleIdentifier:"))
  {
    +[NSNumber numberWithInteger:](&OBJC_CLASS___NSNumber, "numberWithInteger:", 0LL);
    v4 = (void *)objc_claimAutoreleasedReturnValue();
    -[MSDAppPrivacyPermissionsHelper grantCLPermission:toBundleID:](self, "grantCLPermission:toBundleID:", v4, v5);
    objc_release(v4);
  }
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  objc_release(v5);
}

- (void)revokeNetworkPermissionForBundleID:(id)a3 
{
  id v4;
  void *v5;
  void *v6;
  void *v7;
  id v8;
  id v9;
  uint64_t v10;
  void *i;
  void *v12;
  void *v13;
  unsigned int v14;
  NSObject *v15;
  NSObject *v16;
  uint64_t v17;
  uint64_t v18;
  uint64_t v19;
  uint64_t v20;
  uint64_t v21;
  uint64_t v22;
  uint64_t v23;
  NSObject *v24;
  uint8_t buf[16];
  __int128 v26;
  __int128 v27;
  __int128 v28;
  __int128 v29;
  _BYTE v30[128];

  v4 = objc_retain(a3);
  -[MSDAppPrivacyPermissionsHelper getNetworkPrivacyConfiguration](self, "getNetworkPrivacyConfiguration");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = v5;
  if (v5)
  {
    objc_msgSend(v5, "pathController");
    v26 = 0u;
    v27 = 0u;
    v28 = 0u;
    v29 = 0u;
    v24 = (NSObject *)objc_claimAutoreleasedReturnValue();
    -[NSObject pathRules](v24, "pathRules");
    v7 = (void *)objc_claimAutoreleasedReturnValue();
    v8 = objc_msgSend(v7, "countByEnumeratingWithState:objects:count:", &v26, v30, 16LL);
    if (v8)
    {
      v9 = v8;
      v10 = *(_QWORD *)v27;
      while (2)
      {
        for (i = 0LL; i != v9; i = (char *)i + 1)
        {
          if (*(_QWORD *)v27 != v10)
            objc_enumerationMutation(v7);
          v12 = *(void **)(*((_QWORD *)&v26 + 1) + 8LL * (_QWORD)i);
          objc_msgSend(v12, "matchSigningIdentifier");
          v13 = (void *)objc_claimAutoreleasedReturnValue();
          v14 = (unsigned int)objc_msgSend(v13, "isEqualToString:", v4);
          objc_release(v13);
          if (v14)
          {
            objc_msgSend(v12, "setDenyMulticast:", 1LL);
            objc_msgSend(v12, "setMulticastPreferenceSet:", 0LL);
            objc_release(v7);
            -[MSDAppPrivacyPermissionsHelper saveNetworkPrivacyConfiguration:](self, "saveNetworkPrivacyConfiguration:", v6);
            goto LABEL_14;
          }
        }
        v9 = objc_msgSend(v7, "countByEnumeratingWithState:objects:count:", &v26, v30, 16LL);
        if (v9)
          continue;
        break;
      }
    }
    objc_release(v7);
    sub_100061BEC();
    v15 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v15, OS_LOG_TYPE_DEFAULT))
    {
      *(_WORD *)buf = 0;
      _os_log_impl((void *)&_mh_execute_header, v15, OS_LOG_TYPE_DEFAULT, "Unable to find the appropriate privacy rule.", buf, 2u);
    }
    objc_release(v15);
LABEL_14:
    v16 = v24;
  }
  else
  {
    sub_100061BEC();
    v16 = (NSObject *)objc_claimAutoreleasedReturnValue();
    if (os_log_type_enabled(v16, OS_LOG_TYPE_ERROR))
      sub_1000BD660(v16, v17, v18, v19, v20, v21, v22, v23);
  }
  objc_release(v16);
  objc_release(v6);
  objc_release(v4);
}

- (id)getNetworkPrivacyConfiguration
{
  void *v2;
  void *v3;
  NSObject *v4;
  dispatch_time_t v5;
  id v6;
  _QWORD v8[6];
  uint64_t v9;
  uint64_t *v10;
  uint64_t v11;
  uint64_t (*v12)(uint64_t, uint64_t);
  void (*v13)(uint64_t);
  id v14;
  uint64_t v15;
  uint64_t *v16;
  uint64_t v17;
  uint64_t (*v18)(uint64_t, uint64_t);
  void (*v19)(uint64_t);
  dispatch_semaphore_t v20;
  uint64_t vars8;

  v15 = 0LL;
  v16 = &v15;
  v17 = 0x3032000000LL;
  v18 = sub_10001AE34;
  v19 = sub_10001AE44;
  v20 = dispatch_semaphore_create(0LL);
  v9 = 0LL;
  v10 = &v9;
  v11 = 0x3032000000LL;
  v12 = sub_10001AE34;
  v13 = sub_10001AE44;
  v14 = 0LL;
  +[NEConfigurationManager sharedManagerForAllUsers](&OBJC_CLASS___NEConfigurationManager, "sharedManagerForAllUsers");
  v2 = (void *)objc_claimAutoreleasedReturnValue();
  dispatch_get_global_queue(33LL, 0LL);
  v3 = (void *)objc_claimAutoreleasedReturnValue();
  v8[0] = _NSConcreteStackBlock;
  v8[1] = 3221225472LL;
  v8[2] = sub_10001AE4C;
  v8[3] = &unk_10013D638;
  v8[4] = &v9;
  v8[5] = &v15;
  objc_msgSend(v2, "loadConfigurationsWithCompletionQueue:handler:", v3, v8);
  objc_release(v3);
  v4 = (NSObject *)v16[5];
  v5 = dispatch_time(0LL, 30000000000LL);
  dispatch_semaphore_wait(v4, v5);
  v6 = objc_retain((id)v10[5]);
  objc_release(v2);
  _Block_object_dispose(&v9, 8);
  objc_release(v14);
  _Block_object_dispose(&v15, 8);
  objc_release(v20);
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  return objc_autoreleaseReturnValue(v6);
}

- (BOOL)saveNetworkPrivacyConfiguration:(id)a3 
{
  id v3;
  void *v4;
  void *v5;
  NSObject *v6;
  dispatch_time_t v7;
  _QWORD v9[6];
  uint64_t v10;
  uint64_t *v11;
  uint64_t v12;
  uint64_t (*v13)(uint64_t, uint64_t);
  void (*v14)(uint64_t);
  dispatch_semaphore_t v15;
  uint64_t v16;
  uint64_t *v17;
  uint64_t v18;
  char v19;

  v3 = objc_retain(a3);
  v16 = 0LL;
  v17 = &v16;
  v18 = 0x2020000000LL;
  v19 = 1;
  v10 = 0LL;
  v11 = &v10;
  v12 = 0x3032000000LL;
  v13 = sub_10001AE34;
  v14 = sub_10001AE44;
  v15 = dispatch_semaphore_create(0LL);
  +[NEConfigurationManager sharedManagerForAllUsers](&OBJC_CLASS___NEConfigurationManager, "sharedManagerForAllUsers");
  v4 = (void *)objc_claimAutoreleasedReturnValue();
  dispatch_get_global_queue(33LL, 0LL);
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v9[0] = _NSConcreteStackBlock;
  v9[1] = 3221225472LL;
  v9[2] = sub_10001B228;
  v9[3] = &unk_10013D328;
  v9[4] = &v16;
  v9[5] = &v10;
  objc_msgSend(v4, "saveConfiguration:withCompletionQueue:handler:", v3, v5, v9);
  objc_release(v5);
  v6 = (NSObject *)v11[5];
  v7 = dispatch_time(0LL, 30000000000LL);
  dispatch_semaphore_wait(v6, v7);
  LOBYTE(v6) = *((_BYTE *)v17 + 24);
  objc_release(v4);
  _Block_object_dispose(&v10, 8);
  objc_release(v15);
  _Block_object_dispose(&v16, 8);
  objc_release(v3);
  return (char)v6;
}

- (BOOL)isTccOwnedResource:(id)a3 
{
  id v4;
  void *v5;
  unsigned __int8 v6;

  v4 = objc_retain(a3);
  -[MSDAppPrivacyPermissionsHelper tccOwnedResources](self, "tccOwnedResources");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = (unsigned __int8)objc_msgSend(v5, "containsObject:", v4);
  objc_release(v4);
  objc_release(v5);
  return v6;
}

- (BOOL)isCoreLocationOwnedResource:(id)a3 
{
  id v4;
  void *v5;
  unsigned __int8 v6;

  v4 = objc_retain(a3);
  -[MSDAppPrivacyPermissionsHelper coreLocationOwnedResources](self, "coreLocationOwnedResources");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = (unsigned __int8)objc_msgSend(v5, "containsObject:", v4);
  objc_release(v4);
  objc_release(v5);
  return v6;
}

- (BOOL)isNetworkOwnedResource:(id)a3 
{
  id v4;
  void *v5;
  unsigned __int8 v6;

  v4 = objc_retain(a3);
  -[MSDAppPrivacyPermissionsHelper networkOwnedResources](self, "networkOwnedResources");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v6 = (unsigned __int8)objc_msgSend(v5, "containsObject:", v4);
  objc_release(v4);
  objc_release(v5);
  return v6;
}

- (NSSet)tccOwnedResources
{
  return (NSSet *)objc_getProperty(self, a2, 8LL, 1);
}

- (void)setTccOwnedResources:(id)a3 
{
  objc_setProperty_atomic(self, a2, a3, 8LL);
}

- (NSSet)coreLocationOwnedResources
{
  return (NSSet *)objc_getProperty(self, a2, 16LL, 1);
}

- (void)setCoreLocationOwnedResources:(id)a3 
{
  objc_setProperty_atomic(self, a2, a3, 16LL);
}

- (NSSet)networkOwnedResources
{
  return (NSSet *)objc_getProperty(self, a2, 24LL, 1);
}

- (void)setNetworkOwnedResources:(id)a3 
{
  objc_setProperty_atomic(self, a2, a3, 24LL);
}

- (void).cxx_destruct
{
  uint64_t vars8;

  objc_storeStrong((id *)&self->_networkOwnedResources, 0LL);
  objc_storeStrong((id *)&self->_coreLocationOwnedResources, 0LL);
  if (((vars8 ^ (2 * vars8)) & 0x4000000000000000LL) != 0)
    __break(0xC471u);
  objc_storeStrong((id *)&self->_tccOwnedResources, 0LL);
}

- (void)grantPrivacyPermissionsForAllApps
{
  void *v3;
  void *v4;
  id v5;
  id v6;
  id v7;
  uint64_t v8;
  void *i;
  uint64_t v10;
  void *v11;
  __int128 v12;
  __int128 v13;
  __int128 v14;
  __int128 v15;
  _BYTE v16[128];

  +[MSDPreferencesFile sharedInstance](&OBJC_CLASS___MSDPreferencesFile, "sharedInstance");
  v3 = (void *)objc_claimAutoreleasedReturnValue();
  objc_msgSend(v3, "objectForKey:", CFSTR("AppPrivacyPermissions"));
  v4 = (void *)objc_claimAutoreleasedReturnValue();
  objc_release(v3);
  v14 = 0u;
  v15 = 0u;
  v12 = 0u;
  v13 = 0u;
  v5 = objc_retain(v4);
  v6 = objc_msgSend(v5, "countByEnumeratingWithState:objects:count:", &v12, v16, 16LL);
  if (v6)
  {
    v7 = v6;
    v8 = *(_QWORD *)v13;
    do
    {
      for (i = 0LL; i != v7; i = (char *)i + 1)
      {
        if (*(_QWORD *)v13 != v8)
          objc_enumerationMutation(v5);
        v10 = *(_QWORD *)(*((_QWORD *)&v12 + 1) + 8LL * (_QWORD)i);
        objc_msgSend(v5, "objectForKeyedSubscript:", v10, (_QWORD)v12);
        v11 = (void *)objc_claimAutoreleasedReturnValue();
        -[MSDAppPrivacyPermissionsHelper grantPrivacyPermissions:forAppBundleID:](self, "grantPrivacyPermissions:forAppBundleID:", v11, v10);
        objc_release(v11);
      }
      v7 = objc_msgSend(v5, "countByEnumeratingWithState:objects:count:", &v12, v16, 16LL);
    }
    while (v7);
  }
  objc_release(v5);
  objc_release(v5);
}

- (void)revokePrivacyPermissionsForAllApps
{
  void *v3;
  void *v4;
  void *v5;
  id v6;
  id v7;
  id v8;
  uint64_t v9;
  void *i;
  uint64_t v11;
  void *v12;
  NSObject *v13;
  __int128 v14;
  __int128 v15;
  __int128 v16;
  __int128 v17;
  uint8_t buf[4];
  const char *v19;
  __int16 v20;
  uint64_t v21;
  __int16 v22;
  void *v23;
  _BYTE v24[128];

  +[MSDPreferencesFile sharedInstance](&OBJC_CLASS___MSDPreferencesFile, "sharedInstance");
  v3 = (void *)objc_claimAutoreleasedReturnValue();
  objc_msgSend(v3, "objectForKey:", CFSTR("AppPrivacyPermissions"));
  v4 = (void *)objc_claimAutoreleasedReturnValue();
  objc_release(v3);
  +[MSDPreferencesFile sharedInstance](&OBJC_CLASS___MSDPreferencesFile, "sharedInstance");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  objc_msgSend(v5, "removeObjectForKey:", CFSTR("AppPrivacyPermissions"));
  objc_release(v5);
  v16 = 0u;
  v17 = 0u;
  v14 = 0u;
  v15 = 0u;
  v6 = objc_retain(v4);
  v7 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v14, v24, 16LL);
  if (v7)
  {
    v8 = v7;
    v9 = *(_QWORD *)v15;
    do
    {
      for (i = 0LL; i != v8; i = (char *)i + 1)
      {
        if (*(_QWORD *)v15 != v9)
          objc_enumerationMutation(v6);
        v11 = *(_QWORD *)(*((_QWORD *)&v14 + 1) + 8LL * (_QWORD)i);
        objc_msgSend(v6, "objectForKeyedSubscript:", v11, (_QWORD)v14);
        v12 = (void *)objc_claimAutoreleasedReturnValue();
        sub_100061BEC();
        v13 = (NSObject *)objc_claimAutoreleasedReturnValue();
        if (os_log_type_enabled(v13, OS_LOG_TYPE_DEFAULT))
        {
          *(_DWORD *)buf = 136315650;
          v19 = "-[MSDAppPrivacyPermissionsHelper(manager) revokePrivacyPermissionsForAllApps]";
          v20 = 2114;
          v21 = v11;
          v22 = 2114;
          v23 = v12;
          _os_log_impl((void *)&_mh_execute_header, v13, OS_LOG_TYPE_DEFAULT, "%s - Revoking appId:  %{public}@ permissions:  %{public}@", buf, 0x20u);
        }
        objc_release(v13);
        -[MSDAppPrivacyPermissionsHelper revokePrivacyPermissions:forAppBundleID:](self, "revokePrivacyPermissions:forAppBundleID:", v12, v11);
        objc_release(v12);
      }
      v8 = objc_msgSend(v6, "countByEnumeratingWithState:objects:count:", &v14, v24, 16LL);
    }
    while (v8);
  }
  objc_release(v6);
  objc_release(v6);
}

- (void)savePrivacyPermissionsForAllApps:(id)a3 
{
  id v3;
  void *v4;
  void *v5;
  id v6;
  id v7;
  uint64_t v8;
  void *i;
  uint64_t v10;
  void *v11;
  void *v12;
  id v13;
  id v14;
  uint64_t v15;
  void *j;
  uint64_t v17;
  void *v18;
  void *v19;
  NSObject *v20;
  __int128 v21;
  __int128 v22;
  __int128 v23;
  __int128 v24;
  __int128 v25;
  __int128 v26;
  __int128 v27;
  __int128 v28;
  uint8_t buf[4];
  void *v30;
  _BYTE v31[128];
  _BYTE v32[128];

  v3 = objc_retain(a3);
  +[NSMutableDictionary dictionary](&OBJC_CLASS___NSMutableDictionary, "dictionary");
  v4 = (void *)objc_claimAutoreleasedReturnValue();
  objc_msgSend(v3, "getSystemAppDataList");
  v5 = (void *)objc_claimAutoreleasedReturnValue();
  v25 = 0u;
  v26 = 0u;
  v27 = 0u;
  v28 = 0u;
  v6 = objc_msgSend(v5, "countByEnumeratingWithState:objects:count:", &v25, v32, 16LL);
  if (v6)
  {
    v7 = v6;
    v8 = *(_QWORD *)v26;
    do
    {
      for (i = 0LL; i != v7; i = (char *)i + 1)
      {
        if (*(_QWORD *)v26 != v8)
          objc_enumerationMutation(v5);
        v10 = *(_QWORD *)(*((_QWORD *)&v25 + 1) + 8LL * (_QWORD)i);
        objc_msgSend(v3, "getSystemAppPrivacyPermissions:", v10);
        v11 = (void *)objc_claimAutoreleasedReturnValue();
        if (v11)
          objc_msgSend(v4, "setObject:forKey:", v11, v10);
        objc_release(v11);
      }
      v7 = objc_msgSend(v5, "countByEnumeratingWithState:objects:count:", &v25, v32, 16LL);
    }
    while (v7);
  }
  objc_msgSend(v3, "getAppList");
  v12 = (void *)objc_claimAutoreleasedReturnValue();
  v21 = 0u;
  v22 = 0u;
  v23 = 0u;
  v24 = 0u;
  v13 = objc_msgSend(v12, "countByEnumeratingWithState:objects:count:", &v21, v31, 16LL);
  if (v13)
  {
    v14 = v13;
    v15 = *(_QWORD *)v22;
    do
    {
      for (j = 0LL; j != v14; j = (char *)j + 1)
      {
        if (*(_QWORD *)v22 != v15)
          objc_enumerationMutation(v12);
        v17 = *(_QWORD *)(*((_QWORD *)&v21 + 1) + 8LL * (_QWORD)j);
        objc_msgSend(v3, "getAppPrivacyPermissions:", v17);
        v18 = (void *)objc_claimAutoreleasedReturnValue();
        if (v18)
          objc_msgSend(v4, "setObject:forKey:", v18, v17);
        objc_release(v18);
      }
      v14 = objc_msgSend(v12, "countByEnumeratingWithState:objects:count:", &v21, v31, 16LL);
    }
    while (v14);
  }
  if (objc_msgSend(v4, "count"))
  {
    +[MSDPreferencesFile sharedInstance](&OBJC_CLASS___MSDPreferencesFile, "sharedInstance");
    v19 = (void *)objc_claimAutoreleasedReturnValue();
    objc_msgSend(v19, "setObject:forKey:", v4, CFSTR("AppPrivacyPermissions"));
    objc_release(v19);
  }
  sub_100061BEC();
  v20 = (NSObject *)objc_claimAutoreleasedReturnValue();
  if (os_log_type_enabled(v20, OS_LOG_TYPE_DEFAULT))
  {
    *(_DWORD *)buf = 138543362;
    v30 = v4;
    _os_log_impl((void *)&_mh_execute_header, v20, OS_LOG_TYPE_DEFAULT, "AppPrivacyPermissions:  %{public}@", buf, 0xCu);
  }
  objc_release(v20);
  objc_release(v12);
  objc_release(v5);
  objc_release(v4);
  objc_release(v3);
}

@end
