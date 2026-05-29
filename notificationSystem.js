class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.dropdownElement = document.getElementById('notificationsDropdown');
        this.countElement = document.getElementById('notificationCount');
        this.notificationCount = 0;

        if (!this.dropdownElement) {
            this.dropdownElement = document.createElement('div');
            this.dropdownElement.id = 'notificationsDropdown';
            this.dropdownElement.className = 'notifications-dropdown';
            document.querySelector('.notification-icon').appendChild(this.dropdownElement);
        }

        if (!this.countElement) {
            this.countElement = document.createElement('span');
            this.countElement.id = 'notificationCount';
            this.countElement.className = 'notification-badge';
            this.countElement.style.display = 'none';
            document.querySelector('.notification-icon').appendChild(this.countElement);
        }

        setInterval(() => this.clearOldNotifications(), 3600000);
    }

    addNotification(type, title, message) {
        const notification = {
            id: Date.now(),
            type,
            title,
            message,
            timestamp: new Date()
        };
        this.notifications.unshift(notification);
        this.notificationCount++;
        this.countElement.style.display = 'block';
        this.countElement.textContent = this.notificationCount;
        this.renderNotification(notification);
        this.pruneNotifications();
    }

    renderNotification(notification) {
        const element = document.createElement('div');
        element.className = `notification-item notification-${notification.type}`;
        element.dataset.id = notification.id;
        element.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.timestamp.toLocaleTimeString()}</div>
            </div>
            <div class="notification-close">×</div>
        `;
        element.querySelector('.notification-close').addEventListener('click', e => {
            e.stopPropagation();
            this.removeNotification(notification.id);
        });
        this.dropdownElement.insertBefore(element, this.dropdownElement.firstChild);
    }

    removeNotification(id) {
        const element = this.dropdownElement.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.classList.add('removing');
            setTimeout(() => {
                element.remove();
                this.notificationCount--;
                this.countElement.textContent = this.notificationCount;
                if (this.notificationCount === 0) {
                    this.countElement.style.display = 'none';
                }
            }, 300);
        }
    }

    clearOldNotifications() {
        const oneHourAgo = Date.now() - 3600000;
        this.notifications = this.notifications.filter(notification => notification.timestamp.getTime() > oneHourAgo);
        this.updateNotificationCount();
    }

    pruneNotifications() {
        while (this.notifications.length > 50) {
            const oldestNotification = this.notifications.pop();
            this.removeNotification(oldestNotification.id);
        }
    }

    updateNotificationCount() {
        this.notificationCount = this.notifications.length;
        this.countElement.textContent = this.notificationCount;
        this.countElement.style.display = this.notificationCount > 0 ? 'block' : 'none';
    }
}
