import os

def patch():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    android_dir = os.path.join(base_dir, 'android')
    build_gradle = os.path.join(android_dir, 'build.gradle')
    gradle_props = os.path.join(android_dir, 'gradle.properties')

    if not os.path.exists(android_dir):
        print(f"Android directory not found at {android_dir}")
        return

    # 1. Update gradle.properties
    with open(gradle_props, 'a', encoding='utf-8') as f:
        f.write('\nandroid.kotlinVersion=1.9.25\nkotlinVersion=1.9.25\n')
    print("Updated gradle.properties with Kotlin 1.9.25")

    # 2. Update build.gradle
    if os.path.exists(build_gradle):
        with open(build_gradle, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('1.9.24', '1.9.25')
        
        suppress_block = """
allprojects {
    tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
        kotlinOptions {
            freeCompilerArgs += [
                "-P",
                "plugin:androidx.compose.compiler.plugins.kotlin:suppressKotlinVersionCompatibilityCheck=true"
            ]
        }
    }
}
"""
        with open(build_gradle, 'w', encoding='utf-8') as f:
            f.write(content + '\n' + suppress_block)
        print("Successfully patched build.gradle with Kotlin 1.9.25 and suppressCompilerCheck")

if __name__ == '__main__':
    patch()
