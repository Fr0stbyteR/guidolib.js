export enum GuidoMapping {
    kNoMapping = 0,
    kVoiceMapping = 1,
    kStaffMapping = 1 << 1,
    kSystemMapping = 1 << 2
}

export enum GuidoErrCode {
    //! null is used to denote no error
    guidoNoErr = 0,
    //! error while parsing the Guido format
    guidoErrParse = -1,
    //! memory allocation error
    guidoErrMemory = -2,
    //! error while reading or writing a file
    guidoErrFileAccess = -3,
    //! the user cancelled the action
    guidoErrUserCancel = -4,
    //! the music font is not available
    guidoErrNoMusicFont = -5,
    //! the text font is not available
    guidoErrNoTextFont = -6,
    //! bad parameter used as argument
    guidoErrBadParameter = -7,
    //! invalid handler used
    guidoErrInvalidHandle = -8,
    //! required initialisation has not been performed
    guidoErrNotInitialized = -9,
    //! the action failed
    guidoErrActionFailed = -10
}

export enum GuidoElementSelector {
    kGuidoPage,
    kGuidoSystem,
    kGuidoSystemSlice,
    kGuidoStaff,
    /*kGuidoMeasure,*/
    kGuidoBar,
    kGuidoEvent,
    kGuidoScoreElementEnd
}

export enum GuidoElementType {
    kNote = 1,
    kRest,
    kEmpty,
    kBar,
    kRepeatBegin,
    kRepeatEnd,
    kStaff,
    kSystemSlice,
    kSystem,
    kPage
}

export enum PianoRollType { kSimplePianoRoll, kTrajectoryPianoRoll }

export enum PianoRollLineMode {
    // pîano roll: pitch line display modes
    kPRCLine = 1,
    kPRCSharpLine = 1 << 1,
    kPRDLine = 1 << 2,
    kPRDSharpLine = 1 << 3,
    kPRELine = 1 << 4,
    kPRFLine = 1 << 5,
    kPRFSharpLine = 1 << 6,
    kPRGLine = 1 << 7,
    kPRGSharpLine = 1 << 8,
    kPRALine = 1 << 9,
    kPRASharpLine = 1 << 10,
    kPRBLine = 1 << 11,
    kPRAutoLines = 0,
    kPRNoLine = -1
}
