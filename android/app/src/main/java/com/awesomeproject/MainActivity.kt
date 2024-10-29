package com.awesomeproject

import android.content.Intent
import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  companion object {
    private const val REQUEST_CODE_PERMISSION = 1
  }

  override fun getMainComponentName(): String = "AwesomeProject"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // 请求权限
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.SYSTEM_ALERT_WINDOW)
        != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this,
          arrayOf(Manifest.permission.SYSTEM_ALERT_WINDOW),
          REQUEST_CODE_PERMISSION)
    } else {
      // 权限已经授予，可以启动服务
      startFloatingWindowService()
    }
  }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == REQUEST_CODE_PERMISSION) {
      if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        // 权限已授予，可以启动服务
        startFloatingWindowService()
      } else {
        // 权限未授予，给出提示
        Toast.makeText(this, "Permission denied. Cannot start floating window.", Toast.LENGTH_SHORT).show()
      }
    }
  }

  private fun startFloatingWindowService() {
    val serviceIntent = Intent(this, FloatingWindowService::class.java)
    startService(serviceIntent)
  }
}
