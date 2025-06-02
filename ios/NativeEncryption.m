//
//  NativEncryption.m
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>

@interface RCT_EXTERN_MODULE(NativeEncryption, NSObject)

RCT_EXTERN_METHOD(encryptData:(NSString *)key iv:(NSString *)iv str:(NSString *)str callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(decryptData:(NSString *)key iv:(NSString *)iv str:(NSString *)str callback:(RCTResponseSenderBlock)callback)

@end



