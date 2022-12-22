export class XRAnchorModule {
  // private _xrSession: XRSession;
  // private _anchors: Map<string, XRAnchor>;

  // constructor(xrSession: XRSession) {
  //   this._xrSession = xrSession;
  //   this._anchors = new Map<string, XRAnchor>();
  // }

  // async anchorObject(object: THREE.Object3D, anchorId: string) {
  //   // Create an XRAnchor using the current position and orientation of the object
  //   const pose = this._getObjectPose(object);
  //   const anchor = await this._xrSession.createAnchor(pose);
  //   this._anchors.set(anchorId, anchor);
  // }

  // async updateAnchor(anchorId: string, object: THREE.Object3D) {
  //   // Get the XRAnchor for the given id
  //   const anchor = this._anchors.get(anchorId);
  //   if (!anchor) {
  //     throw new Error(`No anchor found with id: ${anchorId}`);
  //   }

  //   // Update the anchor's position and orientation to match the object
  //   const pose = this._getObjectPose(object);
  //   await anchor.update(pose);
  // }

  // async removeAnchor(anchorId: string) {
  //   // Get the XRAnchor for the given id
  //   const anchor = this._anchors.get(anchorId);
  //   if (!anchor) {
  //     throw new Error(`No anchor found with id: ${anchorId}`);
  //   }

  //   // Remove the anchor from the session and remove it from the map
  //   await anchor.detach();
  //   this._anchors.delete(anchorId);
  // }

  // private _getObjectPose(object: THREE.Object3D): XRAnchorPose {
  //   // Convert the object's position and orientation to an XRAnchorPose
  //   const position = object.position.toArray();
  //   const orientation = object.quaternion.toArray();
  //   return new XRAnchorPose(position, orientation);
  // }
}
