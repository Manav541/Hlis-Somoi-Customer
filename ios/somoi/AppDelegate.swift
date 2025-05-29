import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit
 
@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
 
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?
 
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication
      .LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    Thread.sleep(forTimeInterval: 5.0)
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()
 
    reactNativeDelegate = delegate
    reactNativeFactory = factory
 
    window = UIWindow(frame: UIScreen.main.bounds)
 
    // Start React Native with splash screen delay
    factory.startReactNative(
      withModuleName: "somoi",
      in: window,
      launchOptions: launchOptions
    )
 
    // Add delay before removing launch screen (simulate splash screen delay)
    if let rootVC = window?.rootViewController {
      let splashView = UIView(frame: UIScreen.main.bounds)
      splashView.backgroundColor = UIColor.white
 
      // Optionally add your logo/image here
      let imageView = UIImageView(image: UIImage(named: "LaunchImage"))
      imageView.contentMode = .scaleAspectFit
      imageView.center = splashView.center
      splashView.addSubview(imageView)
 
      rootVC.view.addSubview(splashView)
 
      DispatchQueue.main.asyncAfter(deadline: .now() + 5.0) {
        splashView.removeFromSuperview()
      }
    }
 
    return true
  }
}
 
class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
 
  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
