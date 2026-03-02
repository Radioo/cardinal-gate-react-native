package expo.modules.materialyou

import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoMaterialYouModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoMaterialYou")

        Function("getAccentColor") {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return@Function null
            val context = appContext.reactContext ?: return@Function null
            val colorInt = context.getColor(android.R.color.system_accent1_500)
            String.format("#%06X", 0xFFFFFF and colorInt)
        }
    }
}
