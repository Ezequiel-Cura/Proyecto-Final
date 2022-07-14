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
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
const router = (0, express_1.Router)();
router.get("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: "5"
                    },
                    description: "Actualizar a modo Premium"
                }
            ],
            application_context: {
                brand_name: "Proyecto Final Henry",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: "https://finanzas-personales-henry.herokuapp.com/user/buypremium/capture-order",
                cancel_url: "https://finanzas-personales-henry.herokuapp.com/user/buypremium/cancel-order",
            }
        };
        const params = new url_1.URLSearchParams();
        params.append("grant_type", "client_credentials");
        const { data: { access_token } } = yield axios_1.default.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET
            }
        });
        const response = yield axios_1.default.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        res.redirect(response.data.links[1].href);
        // res.json(response.data)
    }
    catch (error) {
        return res.status(500).send("Something goes wrong!");
    }
}));
router.get("/capture-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ///v2/checkout/orders/{id}/capture
    const { token, PayerID } = req.query;
    const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        }
    });
    res.redirect("https://finanzas-personales-henry.herokuapp.com/user/premium/success");
}));
router.get("/cancel-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("https://proyecto-final-lime-beta.vercel.app/home/premium");
}));
exports.default = router;
