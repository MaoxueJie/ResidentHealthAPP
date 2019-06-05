package com.breeze.health;

import android.app.Application;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.tencent.smtt.sdk.QbSdk;

public class APPApplication extends Application {

    @Override
    public void onCreate() {
        // TODO Auto-generated method stub
        super.onCreate();
        initX5();
    }
    private void initX5() {
        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {

            @Override
            public void onViewInitFinished(boolean arg0) {
                //x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
                Log.d("app", " onViewInitFinished is " + arg0);
            }

            @Override
            public void onCoreInitFinished() {
            }
        };
        QbSdk.initX5Environment(getApplicationContext(), cb);
    }
}