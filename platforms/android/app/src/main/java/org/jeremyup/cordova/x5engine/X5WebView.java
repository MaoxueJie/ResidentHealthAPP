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

package org.jeremyup.cordova.x5engine;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.os.Build;
import android.util.AttributeSet;
import android.view.KeyEvent;
import android.view.View;

import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewEngine;

/**
 * Custom WebView subclass that enables us to capture events needed for Cordova.
 *
 * Created by jeremy on 2017/5/18.
 */
public class X5WebView extends WebView implements CordovaWebViewEngine.EngineView {
    private X5WebViewClient viewClient;
    X5WebChromeClient chromeClient;
    private X5WebViewEngine parentEngine;
    private CordovaInterface cordova;

    public X5WebView(Context context) {
        this(context, null);
    }

    public X5WebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    // Package visibility to enforce that only SystemWebViewEngine should call this method.
    void init(X5WebViewEngine parentEngine, CordovaInterface cordova) {
        this.cordova = cordova;
        this.parentEngine = parentEngine;
        if (this.viewClient == null) {
            setWebViewClient(new X5WebViewClient(parentEngine));
        }

        if (this.chromeClient == null) {
            setWebChromeClient(new X5WebChromeClient(parentEngine));
        }
    }

    @Override
    public CordovaWebView getCordovaWebView() {
        return parentEngine != null ? parentEngine.getCordovaWebView() : null;
    }

    @Override
    public void setWebViewClient(WebViewClient client) {
        viewClient = (X5WebViewClient)client;
        super.setWebViewClient(client);
    }

    @Override
    public void setWebChromeClient(WebChromeClient client) {
        chromeClient = (X5WebChromeClient)client;
        super.setWebChromeClient(client);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        Boolean ret = parentEngine.client.onDispatchKeyEvent(event);
        if (ret != null) {
            return ret.booleanValue();
        }
        return super.dispatchKeyEvent(event);
    }

    @Override
    protected boolean drawChild(Canvas canvas, View child, long drawingTime) {
        boolean ret = super.drawChild(canvas, child, drawingTime);
        canvas.save();
        Paint paint = new Paint();
        paint.setColor(0x7fff0000);
        paint.setTextSize(24.f);
        paint.setAntiAlias(true);
        if (getX5WebViewExtension() != null) {
            canvas.drawText(this.getContext().getPackageName() + "-pid:"
                    + android.os.Process.myPid(), 10, 50, paint);
            canvas.drawText(
                    "X5  Core:" + QbSdk.getTbsVersion(this.getContext()), 10,
                    100, paint);
        } else {
            canvas.drawText(this.getContext().getPackageName() + "-pid:"
                    + android.os.Process.myPid(), 10, 50, paint);
            canvas.drawText("Sys Core", 10, 100, paint);
        }
        canvas.drawText(Build.MANUFACTURER, 10, 150, paint);
        canvas.drawText(Build.MODEL, 10, 200, paint);
        canvas.restore();
        return ret;
    }
}
