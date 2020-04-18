export function getUserByPin(pinSearch, users) {
  const [user] = users.filter(user => user.pin === pinSearch);

  return user;
}

export function saveUser(originalUser, data, users) {
  const searchKey = 'pin';

  users.forEach((user, idx) => {
    if (originalUser[searchKey] === user[searchKey]) {
      users[idx] = {
        ...user,
        ...data,
      }
    }
  });
}

export function Account(searchValue, users) {
  const dailyWithdrawLimit = 1000;

  this.today = () => new Date().toDateString();

  this.getTodayLimitUsage = () => {
    // the limit store keeps track of the amount of the daily limit used
    if (!this.state) {
      this.state = {
        day: this.today(),
        limitUsed: 0,
      };
    }

    if (this.state.day !== this.today()) {
      this.state = {
        ...this.state,
        day: this.today(),
        limitUsed: 0,
      };
    }

    return this.state[this.today()] || 0;
  };

  this.addTodayLimitUsage = amount => {
    let limitReached = false;

    if (!this.canAddTodayLimitUsage(amount)) {
      limitReached = true;
    } else {
      const newAmount = this.getTodayLimitUsage() + amount;

      this.state[this.today()] = newAmount;
    }

    return {
      limitReached,
    };
  };

  this.canAddTodayLimitUsage = amount => {
    return this.getTodayLimitUsage() + amount > dailyWithdrawLimit ? false : true;
  };

  this.getUser = () => getUserByPin(searchValue, users);

  this.getBalance = () => this.getUser().balance;

  this.withdraw = amount => {
    let success = false;

    const user = this.getUser();
    const limitReached = this.addTodayLimitUsage(amount).limitReached;

    if (!limitReached) {
      saveUser(user, {
        balance: user.balance - amount,
      }, users);

      success = true;
    } else {
      success = false;
    }

    return {
      success,
    };
  };

  this.deposit = amount => {
    const user = this.getUser();

    saveUser(user, {
      balance: user.balance + amount,
    }, users);

    return {
      success: true,
    };
  };
}
