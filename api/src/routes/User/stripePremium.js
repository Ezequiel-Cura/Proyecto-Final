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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LLEF3JqdJUgQbC1PKIVo0uUmubjgnhvsX0pQuDJUEesap4t2rCtM3Ee7CJ0pP2CfmhVlOE23cMbJWzSRtMKbKE4008A8xCL13');
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1LLFFYJqdJUgQbC1lQMWLxfP',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://localhost:3001/premium/buy?success=true`,
            cancel_url: `http://localhost:3000/home/premium`,
        });
        res.redirect(303, session.url);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
