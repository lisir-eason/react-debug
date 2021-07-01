/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {FiberRoot, SuspenseHydrationCallbacks} from './ReactInternalTypes';
import type {RootTag} from './ReactRootTags';

import {noTimeout, supportsHydration} from './ReactFiberHostConfig';
import {createHostRootFiber} from './ReactFiber.new';
import {
  NoLanes,
  NoLanePriority,
  NoTimestamp,
  createLaneMap,
} from './ReactFiberLane';
import {
  enableSchedulerTracing,
  enableSuspenseCallback,
} from 'shared/ReactFeatureFlags';
import {unstable_getThreadID} from 'scheduler/tracing';
import {initializeUpdateQueue} from './ReactUpdateQueue.new';
import {LegacyRoot, BlockingRoot, ConcurrentRoot} from './ReactRootTags';

function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;  //root的类型 LegacyRoot = 0; BlockingRoot = 1; ConcurrentRoot = 2;
  this.containerInfo = containerInfo; //就是传入的根div,id为root的div
  this.pendingChildren = null;
  this.current = null;  //当前的fiber树，指向rootFiber
  this.pingCache = null;
  this.finishedWork = null;  //completeWork最后返回的树，也就是workInProgress，指向rootFiber
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;  //是否混合模式
  this.callbackNode = null;  //由schedule创建的callback，也就是宏观任务
  this.callbackPriority = NoLanePriority; //由schedule创建的callback的优先级
  this.eventTimes = createLaneMap(NoLanes);  //记录每个优先级任务的开始时间
  this.expirationTimes = createLaneMap(NoTimestamp); //记录每个优先级任务的过期时间时间

  this.pendingLanes = NoLanes;  //挂起的车道
  this.suspendedLanes = NoLanes;  //暂停的车道
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;  //过期的车道
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;  //完成的车道

  this.entangledLanes = NoLanes;  //纠缠的车道
  this.entanglements = createLaneMap(NoLanes);

  if (supportsHydration) {
    this.mutableSourceEagerHydrationData = null;
  }

  if (enableSchedulerTracing) {
    this.interactionThreadID = unstable_getThreadID();
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }

  if (__DEV__) {
    switch (tag) {
      case BlockingRoot:
        this._debugRootType = 'createBlockingRoot()';
        break;
      case ConcurrentRoot:
        this._debugRootType = 'createRoot()';
        break;
      case LegacyRoot:
        this._debugRootType = 'createLegacyRoot()';
        break;
    }
  }
}

export function createFiberRoot(
  containerInfo: any,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): FiberRoot {
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  initializeUpdateQueue(uninitializedFiber);

  return root;
}
