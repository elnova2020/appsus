'use strict'
import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'


export const emailService = {
    query,
    _add,
    remove,
    removeEmail,
    emailRead,
    emailStar,
    toggleRead,
    getEmailsCount,
    getEmailById
}

const KEY = 'emailsDB';

var gEmails;

_createEmails();

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        _saveEmailsToStorage();
    }
}

function query() {
    return Promise.resolve(gEmails);
}

//to check what way is better?//
function remove(emailId) {
    gEmails = gEmails.filter(email => email.id !== emailId);
    _saveEmailsToStorage();
    return Promise.resolve();
}

function removeEmail(id) {
    gEmails.forEach((email, idx) => {
        if (email.id === id) {
            if (!email.isDeleted) {
                email.isDeleted = true;
            }
            else emails.splice(idx, 1)
        }
    })
    _saveEmailsToStorage()
}

/************************** */

function _saveEmailsToStorage() {
    storageService.save('emailsDB', gEmails)
}

function _add(email) {
    const emailToAdd = {
        id: utilService.makeId(),
        ...email
    };
gEmails = [emailToAdd, ...gEmails];
    _saveEmailsToStorage();
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
        },
        {
            id: utilService.makeId(),
            title: 'this girl is on fire',
            from: 'Emma',
            body: 'one love',
            isStar: false,
            isRead: true,
            isDeleted: false,
        },
        {
            id: utilService.makeId(),
            title: 'true jedi',
            from: 'Mr. Yoda',
            body: 'may the force be with you',
            isStar: false,
            isRead: false,
            isDeleted: false,
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
    _saveEmailsToStorage()
}

function toggleRead(emailRead) {
    gEmails.forEach((email) => {
        if (email.id === emailRead.id) {
            email.isRead = !email.isRead
        }
    })
    _saveEmailsToStorage()
}

function emailStar(emailStarred) {
    gEmails.forEach((email) => {
        if (email.id === emailStarred.id) {
            email.isStar = !email.isStar
        }
    })
    _saveEmailsToStorage()
}


function getEmailsCount() {
    return gEmails.length
}

function getEmailById(emailId) {
    return emails.find(email => email.id === emailId)
  }