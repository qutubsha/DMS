// Declare all constant and global variables here to be referred to multiple locations in the project
export const GlobalVariable = Object.freeze({
    rowsOnPage: 25,
    ratingImgSrc: 'assets/images/rating',
    displayBlockClass: 'custom-display-block',
    displayNoneClass: 'custom-display-none',
    backgroundBlueClass: 'background-blue',
    backgroundGreenClass: 'background-green',
    backgroundRedClass: 'background-red',
    backgroundNoneClass: 'background-none',

    defaultStartDatePickerOptions: {
        todayBtnTxt: 'Today',
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'su',
        sunHighlight: true,
        markCurrentDay: true,
        selectionTxtFontSize: '12px',
        alignSelectorRight: false,
        indicateInvalidDate: true,
        showDateFormatPlaceholder: true,
        editableMonthAndYear: false,
        minYear: 2014,
        maxYear: 9999,
        componentDisabled: false,
        inputValueRequired: false,
        showClearDateBtn: true,
        showSelectorArrow: true,
        editableDateField: false,
        disableUntil: { year: 2013, month: 12, day: 31 },
        disableSince: { year: new Date().getFullYear() + 2, month: 1, day: 1 }
    },

    defaultEndDatePickerOptions: {
        todayBtnTxt: 'Today',
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'su',
        sunHighlight: true,
        markCurrentDay: true,
        selectionTxtFontSize: '12px',
        alignSelectorRight: false,
        indicateInvalidDate: true,
        showDateFormatPlaceholder: true,
        editableMonthAndYear: false,
        minYear: 2014,
        maxYear: 9999,
        componentDisabled: false,
        inputValueRequired: false,
        showClearDateBtn: true,
        showSelectorArrow: true,
        editableDateField: false,
        disableUntil: { year: 2013, month: 12, day: 31 },
        disableSince: { year: new Date().getFullYear() + 2, month: 1, day: 1 }
    },

    disableDatePickerOptions: {
        dateFormat: 'mm/dd/yyyy',
        selectionTxtFontSize: '12px',
        componentDisabled: true
    },

    notificationOptions: {
        timeOut: 2000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        rtl: false,
        animate: 'scale',
        position: ['right', 'top'],
    }

});

export interface IDictionary {
    key: string;
    value: string
}