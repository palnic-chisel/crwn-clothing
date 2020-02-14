import {takeLatest, put, call, all} from 'redux-saga/effects';

import ShopActionsTypes from "./ShopTypes";

import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/FirebaseUtils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./ShopActions";

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionMap));
    } catch (e) {
        yield put(fetchCollectionsFailure(e.message))
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionsTypes.FETCH_COLLECTION_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}