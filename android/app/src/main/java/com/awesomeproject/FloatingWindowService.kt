package com.awesomeproject

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.provider.Settings
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.Toast

class FloatingWindowService : Service() {
    private lateinit var windowManager: WindowManager
    private lateinit var floatingView: View

    override fun onCreate() {
        super.onCreate()

        // 检查是否有悬浮窗权限
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            Toast.makeText(this, "没有悬浮窗权限", Toast.LENGTH_LONG).show()
            stopSelf() // 没有权限时停止服务
            return
        }

        // 获取 WindowManager
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        val inflater = getSystemService(LAYOUT_INFLATER_SERVICE) as LayoutInflater

        // 加载悬浮窗布局
        floatingView = inflater.inflate(R.layout.floating_window_layout, null)

        // 设置悬浮窗的布局参数
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        // 将悬浮窗添加到窗口管理器中
        windowManager.addView(floatingView, params)
    }

    override fun onDestroy() {
        super.onDestroy()
        // 销毁时移除悬浮窗
        windowManager.removeView(floatingView)
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
