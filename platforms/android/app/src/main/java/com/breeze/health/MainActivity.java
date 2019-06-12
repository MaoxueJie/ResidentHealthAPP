/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.breeze.health;

import android.os.Bundle;

import com.tencent.smtt.sdk.QbSdk;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    protected void init() {
        long time = 0;
        while(true){
            if (QbSdk.isTbsCoreInited() || time>5000){
                break;
            }
            try {
                java.lang.Thread.sleep(1000);
            }catch (Throwable e){}
            time += 1000;
        }
        super.init();
    }

    @Override
    public void onCreate(Bundle savedInstanceState)
    {

        super.onCreate(savedInstanceState);
        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        setStatusBar();
        loadUrl(launchUrl);
    }

    protected void setStatusBar() {
        StatusBarUtil.setTransparent(this);
        //StatusBarUtil.setColor(this, getResources().getColor(R.color.colorPrimary));
    }
}
