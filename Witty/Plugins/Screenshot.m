//
//  Screenshot.h
//
//  Created by Simon Madine on 29/04/2010.
//  Copyright 2010 The Angry Robot Zombie Factory.
//   - Converted to Cordova 1.6.1 by Josemando Sobral.
//  MIT licensed
//
//  Modifications to support orientation change by @ffd8
//

#import "Screenshot.h"

@implementation Screenshot

//@synthesize webView;

- (void)saveScreenshot:(NSArray*)arguments withDict:(NSDictionary*)options
{
	CGRect imageRect;
	CGRect screenRect = [[UIScreen mainScreen] bounds];

	// statusBarOrientation is more reliable than UIDevice.orientation
	UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;

	if (orientation == UIInterfaceOrientationLandscapeLeft || orientation == UIInterfaceOrientationLandscapeRight) { 
		// landscape check
		imageRect = CGRectMake(0, 0, CGRectGetHeight(screenRect), CGRectGetWidth(screenRect));
	} else {
		// portrait check
		imageRect = CGRectMake(0, 0, CGRectGetWidth(screenRect), CGRectGetHeight(screenRect));
	}
    

	// Adds support for Retina Display. Code reverts back to original if iOs 4 not detected.
	if (NULL != UIGraphicsBeginImageContextWithOptions)
        UIGraphicsBeginImageContextWithOptions(imageRect.size, NO, 0);
    else
        UIGraphicsBeginImageContext(imageRect.size);
    
	CGContextRef ctx = UIGraphicsGetCurrentContext();
	[[UIColor blackColor] set];
//	[[UIColor whiteColor] set];
	CGContextTranslateCTM(ctx, 0, 0);
	CGContextFillRect(ctx, imageRect);
    
	[self.webView.layer renderInContext:ctx];

	UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
//	UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil);
    UIImageWriteToSavedPhotosAlbum(image,
                                   self,
                                   @selector(savedPhotoImage:didFinishSavingWithError:contextInfo:),
                                   nil);
	UIGraphicsEndImageContext();
    
/*	UIAlertView *alert= [[UIAlertView alloc] initWithTitle:nil message:@"Map Saved to Photos" delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];
	[alert show];
	[alert release];*/
}

- (void) savedPhotoImage:(UIImage *)image
  didFinishSavingWithError:(NSError *)error
               contextInfo:(void *)contextInfo
{
    NSString *message = @"This image has been saved to your Photos album";
    if (error) {
        message = [error localizedDescription];
    }
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                    message:message
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];
    [alert release];
}

@end