'use strict'
import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'


export const emailService = {
    query,
    addEmail,
    remove,
    removeEmail,
    emailRead,
    emailStar,
    toggleRead,
    saveEmailsToStorage,
    sortEmails,
    getEmailsCount,
    getEmailById,
    sendEmail,
    unreadMailCount
}

const KEY = 'emailsDB';

var gEmails;

_createEmails();

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        saveEmailsToStorage();
    }
}

function query() {
    return Promise.resolve(gEmails);
}

//which way is better?//

function remove(emailId) {
    gEmails = gEmails.filter(email => email.id !== emailId);
    saveEmailsToStorage();
    return Promise.resolve();
}

function removeEmail(id) {
    gEmails.forEach((email, idx) => {
        if (email.id === id) {
            if (!email.isDeleted) {
                email.isDeleted = true;
            }
            else gEmails.splice(idx, 1)
        }
    })
    saveEmailsToStorage()
}

function removeSelectedEmail(emailId) {
    const idx = gEmails.findIndex(email => email.id === emailId)
    if (idx === -1) return Promise.reject('Did Not Remove Email')
    gEmails.splice(idx, 1)
    saveEmailsToStorage()
    return Promise.resolve(gEmails)
}

/************************** */

function saveEmailsToStorage() {
    storageService.save('emailsDB', gEmails)
}

function addEmail(email) {
    const emailToAdd = {
        id: utilService.makeId(),
        ...email
    };
    gEmails = [emailToAdd, ...gEmails];
    saveEmailsToStorage();
    return Promise.resolve(emailToAdd);
}


function _getDemoEmails() {
    const emails = [
        {
            id: utilService.makeId(),
            title: 'hello',
            from: 'Mor',
            body: 'have a nice day',
            isStar: true,
            isRead: false,
            isDeleted: false,
            isSent: false,
            sentAt: 1551133930594
        },
        {
            id: utilService.makeId(),
            title: 'this girl is on fire',
            from: 'Emma',
            body: 'one love',
            isStar: false,
            isRead: true,
            isDeleted: false,
            isSent: false,
            sentAt: 1551133930594
        },
        {
            id: utilService.makeId(),
            title: 'true jedi',
            from: 'Mr. Yoda',
            body: 'may the force be with you',
            isStar: false,
            isRead: false,
            isDeleted: false,
            isSent: false,
            sentAt: 1551133930594
        }
    ];
    return emails;
}


function emailRead(emailRead) {
    gEmails.forEach((email) => {
        if (email.id === emailRead.id) {
            email.isRead = true;
        }
    })
    saveEmailsToStorage()
}

function toggleRead(emailRead) {
    gEmails.forEach((email) => {
        if (email.id === emailRead.id) {
            email.isRead = !email.isRead
        }
    })
    saveEmailsToStorage()
}

function emailStar(emailStarred) {
    gEmails.forEach((email) => {
        if (email.id === emailStarred.id) {
            email.isStar = !email.isStar
        }
    })
    saveEmailsToStorage()
}


function sortEmails(emails, sortBy) {
    sortBy = sortBy.toLowerCase()
    if (sortBy === 'title') {
        emails.sort(function (a, b) {
            var email1 = a.title
            var email2 = b.title
            email1 = email1.toLowerCase()
            email2 = email2.toLowerCase()
            if (email1 < email2) return -1
            if (email1 > email2) return 1
            return 0;
        })
    } else {
        emails.sort(function (a, b) {
            return b.sentAt - a.sentAt
        })
    }
    return emails
}



function getEmailsCount() {
    return gEmails.length
}

function unreadMailCount() {
    let count = gEmails.filter(function (email) { return !email.isRead; }).length;
    if (!count) return 0;
    return count;
}

function getEmailById(emailId) {
    return gEmails.find(email => email.id === emailId)
}


function sendEmail(){
    gEmails.push(email);
    saveEmailsToStorage()
    return Promise.resolve(gEmails);
}