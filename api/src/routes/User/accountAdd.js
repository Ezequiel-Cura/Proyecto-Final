"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
router.post("/", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = "62c0a45f6ffc62c777c647de" --- Hardcoded id for testing purposes (comment "authorization" above)
    // const accountUpdate = user.extra[key].findById(value._id) No entiendo lo del date
    const { frequency, key, value } = req.body;
    const id = req.userId;
    try {
        // Check presence of user 
        const user = yield User_1.default.findById(id);
        if (!user)
            return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`);
        //---------------------------------
        // should frequency be monthly, simply push the entry
        if (frequency === "monthly") {
            yield user.monthly[key].push(value);
            yield user.save();
            console.log(user.monthly);
            return res.status(200).send(user);
        }
        //---------------------------------
        // If not, search by date (mm-yyyy) and push the entry to the object
        //---------------------------------
        //Get date from request to find in arrays or create a new object
        const dateSplit = value.date.split('-'); // Separate date into [yyyy, mm, dd]
        const targetDate = `${dateSplit[0]}-${dateSplit[1]}`; //transform date into format mm-yyyy
        const foundObj = user.extra[key].filter((e) => e.date === targetDate); // filter extra array by target date
        if (foundObj.length === 0) {
            // Create new entry if not existing
            const newEntry = {
                date: targetDate,
                entries: [value]
            };
            yield user.extra[key].push(newEntry);
            yield user.save();
            return res.status(200).send(user);
        }
        //---------------------------------
        // Search index of target Date
        const targetIndex = user.extra[key].map((e) => e.date).indexOf(targetDate);
        yield user.extra[key][targetIndex].entries.push(value);
        yield user.save();
        res.status(200).send(user);
        //---------------------------------
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.default = router;
