//
//  DirectoryEmitter.m
//  Ripple
//
//  Created by Niklas Lindeke on 2016-05-08.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DirectoryEmitter.h"

@implementation DirectoryEmitter

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  
  NSArray *paths = NSSearchPathForDirectoriesInDomains
  (NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *name = @"/AccessToken.txt";
  NSString *filename = [documentsDirectory stringByAppendingString:name];
  
  NSString* content = [NSString stringWithContentsOfFile:filename
                                                encoding:NSUTF8StringEncoding
                                                   error:nil];
  
  return @{ @"Token": content };
}
@end