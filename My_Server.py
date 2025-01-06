import customtkinter as ctk
from tkinter import messagebox
import threading
from flask import Flask, jsonify, request
import os
import discord
from discord.ext import commands
from discord import app_commands
import json
import asyncio

# ----------------------------------------
# Flask app setup for HWID management
# ----------------------------------------
app = Flask(__name__)
banned_hwids = {"banned": [], "unbanned": []}

@app.route('/banned_hwids', methods=['GET'])
def get_banned_hwids():
    """API endpoint to retrieve the list of banned HWIDs."""
    return jsonify(banned_hwids)

@app.route('/ban', methods=['POST'])
def ban_hwid():
    """API endpoint to ban a specific HWID."""
    data = request.json
    hwid = data.get('hwid')
    if hwid and hwid not in banned_hwids["banned"]:
        banned_hwids["banned"].append(hwid)
        return jsonify({"message": f"HWID {hwid} banned."}), 200
    return jsonify({"error": "HWID already banned or invalid."}), 400

@app.route('/unban', methods=['POST'])
def unban_hwid():
    """API endpoint to unban a specific HWID."""
    data = request.json
    hwid = data.get('hwid')
    if hwid and hwid in banned_hwids["banned"]:
        banned_hwids["banned"].remove(hwid)
        banned_hwids["unbanned"].append(hwid)
        return jsonify({"message": f"HWID {hwid} unbanned."}), 200
    return jsonify({"error": "HWID not found in banned list."}), 400

def start_server():
    """Starts the Flask server on a dynamic port."""
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

# ----------------------------------------
# Discord Bot Setup
# ----------------------------------------
DISCORD_TOKEN = "MTI5MjEzMDA3MTUyNzU1NTE0NA.GqwIiA.7hN_hWms7_f7_DvFSDiuddEQ6xHjkDrTVJMW8A"
SECOND_BOT_TOKEN = "MTMwMDU2MzYwOTU1ODA1NzAxMA.GCL4xu.PFFcT4PdkvWB1d8x1i8M2yYXncKxwAMHQJHUtw"
GUILD_ID = 1244257547125260338  # Replace with your guild ID

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

second_bot_intents = discord.Intents.default()
second_bot_intents.message_content = True
second_bot = commands.Bot(command_prefix="?", intents=second_bot_intents)

@second_bot.event
async def on_ready():
    try:
        await second_bot.tree.sync(guild=discord.Object(id=GUILD_ID))
        print(f"Second bot is ready! Logged in as {second_bot.user}.")
    except Exception as e:
        print(f"Error syncing commands: {e}")

@second_bot.tree.command(name="register", description="Register with a username, password, and license key.")
async def register(interaction: discord.Interaction, username: str, password: str, license_key: str):
    # Command logic for registration
    await interaction.response.send_message(f"Registered {username} successfully!", ephemeral=True)

@second_bot.tree.command(name="ban", description="Ban a user by HWID.")
async def ban(interaction: discord.Interaction, hwid: str):
    if hwid not in banned_hwids["banned"]:
        banned_hwids["banned"].append(hwid)
        await interaction.response.send_message(f"HWID {hwid} banned.", ephemeral=True)
    else:
        await interaction.response.send_message(f"HWID {hwid} is already banned.", ephemeral=True)

@second_bot.tree.command(name="unban", description="Unban a user by HWID.")
async def unban(interaction: discord.Interaction, hwid: str):
    if hwid in banned_hwids["banned"]:
        banned_hwids["banned"].remove(hwid)
        banned_hwids["unbanned"].append(hwid)
        await interaction.response.send_message(f"HWID {hwid} unbanned.", ephemeral=True)
    else:
        await interaction.response.send_message(f"HWID {hwid} is not banned.", ephemeral=True)

# ----------------------------------------
# GUI for controlling server and bots
# ----------------------------------------
def create_gui():
    """Creates a modern GUI for controlling the Flask server and Discord bots."""
    ctk.set_appearance_mode("System")
    ctk.set_default_color_theme("blue")

    root = ctk.CTk()
    root.title("Server and Bot Controller")
    root.geometry("500x500")
    root.resizable(False, False)

    status_var = ctk.StringVar(value="Server Stopped")
    bot_status_var = ctk.StringVar(value="Bots Stopped")

    def start_all():
        threading.Thread(target=start_server, daemon=True).start()
        threading.Thread(target=lambda: asyncio.run(bot.start(DISCORD_TOKEN)), daemon=True).start()
        threading.Thread(target=lambda: asyncio.run(second_bot.start(SECOND_BOT_TOKEN)), daemon=True).start()
        status_var.set("Server Running")
        bot_status_var.set("Bots Running")
        messagebox.showinfo("Status", "Server and Bots started successfully!")

    def stop_all():
        messagebox.showinfo("Info", "Close the terminal to stop the server and bots.")
        root.destroy()

    ctk.CTkLabel(root, text="Server and Bot Controller", font=("Arial", 20, "bold")).pack(pady=20)
    ctk.CTkLabel(root, textvariable=status_var, font=("Arial", 16)).pack(pady=10)
    ctk.CTkLabel(root, textvariable=bot_status_var, font=("Arial", 16)).pack(pady=10)

    ctk.CTkButton(root, text="Start All", command=start_all, fg_color="green", hover_color="#3c9c3c").pack(pady=10)
    ctk.CTkButton(root, text="Stop All", command=stop_all, fg_color="red", hover_color="#b53131").pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    create_gui()
