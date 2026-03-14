require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "CngEditorSdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/chatngift-pn/cng-banuba-sdk"
  s.license      = package["license"]
  s.authors      = { "CNG Banuba SDK" => "dev@example.com" }
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/chatngift-pn/cng-banuba-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.dependency "React-Core"
end
