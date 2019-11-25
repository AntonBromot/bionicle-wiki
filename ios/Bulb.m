
//#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface
  RCT_EXTERN_MODULE(Bulb, NSObject)
  RCT_EXTERN_METHOD(toggleOn: (RCTResponseSenderBlock)callback)
  RCT_EXTERN_METHOD(getStatus: (RCTResponseSenderBlock)callback)
@end
